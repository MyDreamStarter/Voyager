import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect , assert } from "chai"
import { ethers , network} from "hardhat"
import { TokenFestHolder , MyToken , AccessMaster} from "../typechain-types"
import exp from "constants"
import { Address } from "cluster"
import { Console } from "console"

    describe("Voyager Holder,Without Staking", () => {
                                        
        let [owner, creator, creator2, buyer, operator ]: SignerWithAddress[] = new Array(5)
        before(async () => {
            [owner,creator, creator2, buyer, operator] = await ethers.getSigners()
            
        })

        let accessmaster : AccessMaster
        let Voyager: TokenFestHolder
        let token : MyToken

        const proposalDetails = [
            "10000000000000000000",
            600,
            1200,
            "1000000000000000000"
        ]

        let Addr;

    
        before(async () => {

            const AccessMasterFactory = await ethers.getContractFactory("AccessMaster")
            accessmaster = await AccessMasterFactory.deploy()

            const TokenFactory = await ethers.getContractFactory("MyToken")
            token = await TokenFactory.deploy()

            Addr = [token.address,accessmaster.address]

            let  VoyagerFactory = await ethers.getContractFactory("TokenFestHolder")
            Voyager = await VoyagerFactory.deploy(owner.address , "My Event","EVE",proposalDetails,20,"www.xyz",Addr)
        })

        describe("Without Staking ",async () =>{
            it("Should return the right info of the token",async () =>{
                expect(await Voyager.crowdFundingGoal()).to.equal(proposalDetails[0])
                expect(await Voyager.salePrice()).to.equal(proposalDetails[3])
                expect(await Voyager.pause()).to.true

            })
            it("Set Time By Proposal Creator and Stake",async() =>{
                /// Testing set Funding End is changing or not
                let prev  = await Voyager.fundingActiveTime()
                await Voyager.setFundingStartTime(1200)
                expect(await Voyager.fundingActiveTime()).to.not.equal(prev)
            
                /// Testing setFunding End time is changing or not
                let prevEnd =  await Voyager.fundingEndTime()
                await Voyager.setFundingEndTime(2400)

                expect(await Voyager.fundingEndTime()).to.not.equal(prevEnd)

                await Voyager.setFundingStartTime(0)
                /// start time
                expect(Voyager.setFundingStartTime(10)).to.be.revertedWith("VoyagerCollab: Funding has been intiated , action cannot be performed")
                /// end time
                expect(Voyager.setFundingEndTime(10)).to.be.revertedWith("VoyagerCollab: Funding has been intiated , action cannot be performed")

                // Stake and mintTicket
                expect(Voyager.mintTicket(1)).to.be.revertedWith("VoyagerCollab__ProposalRejected()");
             
                expect(Voyager.mintTicket(1)).to.be.revertedWith("VoyagerCollab: Proposal is being rejected")

                // expect(await Voyager.isProposalRejected()).to.be.true

            })
        })
    })

    describe("Voyager Holder ,With Staking Without Crowfunding Goal Reached", () => {
        let [owner, creator, creator2, buyer, operator ]: SignerWithAddress[] = new Array(5)
        before(async () => {
            [owner, operator, creator, creator2, buyer] = await ethers.getSigners()
            
        })
        let accessmaster : AccessMaster
        let Voyager: TokenFestHolder
        let token : MyToken

        const proposalDetails = [
            "10000000000000000000",
            600,
            1200,
            "1000000000000000000"
        ]

        let Addr;

        let mintAmount = "100000000000000000000"
    
        before(async () => {

            const AccessMasterFactory = await ethers.getContractFactory("AccessMaster")
            accessmaster = await AccessMasterFactory.deploy()

            const TokenFactory = await ethers.getContractFactory("MyToken")
            token = await TokenFactory.deploy()

            Addr = [token.address,accessmaster.address]
            let  VoyagerFactory = await ethers.getContractFactory("TokenFestHolder")
            Voyager = await VoyagerFactory.deploy(creator.address , "My Event","EVE",proposalDetails,20,"www.xyz",Addr)

            await token.mint(mintAmount)
            await token.connect(creator).mint(mintAmount)
            await token.connect(buyer).mint(mintAmount)
        })
        it("stake",async() =>{
                let VoyagerCreator = Voyager.connect(creator)
                let val = await Voyager.crowdFundingGoal()
                val = (val.mul(20)).div(100)
                await token.connect(creator).approve(Voyager.address,val)
                expect(Voyager.stake(val)).to.be.reverted
                await VoyagerCreator.stake(val)
                expect(await Voyager.isCreatorStaked()).to.be.true;
        })
        it("mint Ticket",async() =>{
                let VoyagerCreator = Voyager.connect(creator)
                let VoyagerBuyer = Voyager.connect(buyer)
                /// Forwarding the time
                await network.provider.send("hardhat_mine", ["0x400"]);
                let val = await Voyager.salePrice()
                // for buyer
                await token.connect(buyer).approve(Voyager.address,val)
                /// for owner
                await token.approve(Voyager.address,val)
                await VoyagerBuyer.mintTicket(1)
                /// for owner
                await Voyager.mintTicket(1)
                expect(await Voyager.balanceOf(buyer.address)).to.be.equal(1)
                expect(await Voyager.ownerOf(1)).to.be.equal(buyer.address)
        
        })
        it("Intiate Proposal rejection",async() => {
            await network.provider.send("hardhat_mine", ["0x100"]);
            expect(Voyager.claimback()).to.be.reverted
            expect(Voyager.claimback()).to.be.revertedWith("VoyagerCollab_ClaimedNotPossible()")
            expect(Voyager.mintTicket(1)).to.be.revertedWith("VoyagerCollab: Funding time has been passed")
            /// If intiate rejection working or not
            await Voyager.connect(buyer).intiateRejection()
            expect(await Voyager.isProposalRejected()).to.be.true
            expect(await Voyager.isProposalCleared()).to.be.true
        })  
        it("claimback",async () =>{
            let amount =  await Voyager.salePrice()
            let prevBalance =  await token.balanceOf(buyer.address)
            await Voyager.connect(buyer).claimback()
            let afterBalance = await token.balanceOf(buyer.address)
            let diff = afterBalance.sub(prevBalance)
            /// previous balance of Buyer have the difference with  After balance exactly the Price Per NFT  multiply quantity
            expect(diff).to.be.equal(amount)
            ///To check if the FUnding can be intiated by proposal creator even after Proposal rejected
            expect(Voyager.connect(creator).intiateProposalFunding()).to.be.reverted
        })
        it("Unstake", async() =>{
            let amount = await Voyager.crowdFundingGoal()
            amount = (amount.mul(20)).div(100)
            let prevBalance =  await token.balanceOf(creator.address)
            await Voyager.connect(creator).unStake()
            let afterBalance = await token.balanceOf(creator.address)
            let diff = afterBalance.sub(prevBalance)
            /// previous balance of Buyer have the difference with  After balance exactly the Price Per NFT  multiply quantity
            expect(diff).to.be.equal(amount)
            expect(Voyager.connect(creator).unStake()).to.be.revertedWith
        })

    })

    describe("Voyager Holder ,With Staking With CrowFunding Goal Reaches", () => {
        let [owner, creator, creator2, buyer, operator ]: SignerWithAddress[] = new Array(5)
        before(async () => {
            [owner,creator, creator2, buyer,operator] = await ethers.getSigners()    
        })
        let accessmaster : AccessMaster
        let Voyager: TokenFestHolder
        let token : MyToken

        const proposalDetails = [
            "10000000000000000000",
            600,
            1200,
            "1000000000000000000"
        ]

        let Addr;
        let mintAmount = "100000000000000000000"
        let withdrawAmount =  "500000000000000000"
    
        before(async () => {

            const AccessMasterFactory = await ethers.getContractFactory("AccessMaster")
            accessmaster = await AccessMasterFactory.deploy()

            const TokenFactory = await ethers.getContractFactory("MyToken")
            token = await TokenFactory.deploy()

            Addr = [token.address,accessmaster.address]

            let  VoyagerFactory = await ethers.getContractFactory("TokenFestHolder")
            Voyager = await VoyagerFactory.deploy(creator.address , "My Event","EVE",proposalDetails,20,"www.xyz",Addr)
            
            /// MINT ERC20 TOkens
            await token.mint(mintAmount)
            await token.connect(creator).mint(mintAmount)
            await token.connect(buyer).mint(mintAmount)

            /// STAKE
            let VoyagerCreator = Voyager.connect(creator)
            let val = await Voyager.crowdFundingGoal()
            val = (val.mul(20)).div(100)
            await token.connect(creator).approve(Voyager.address,val)
            await VoyagerCreator.stake(val)
        })
        it("To check if Funding Goal Reached, Minting cannot be done",async()=>{
            await network.provider.send("hardhat_mine", ["0x400"]);
            let val = await Voyager.salePrice()
            val = val.mul(8)
            /// Buyer will mint 8 tokens
            await token.connect(buyer).approve(Voyager.address,val)
            await Voyager.connect(buyer).mintTicket(8)
            /// Owner will buy 2 more tokens
            await token.approve(Voyager.address,val)
            await Voyager.mintTicket(2)
            /// To check if the funds collected  is equal to Crowd Fund Goal
            let fundsInReserve = await Voyager.fundsInReserve()
            expect(await Voyager.crowdFundingGoal()).to.be.equal(fundsInReserve)
            //// To check if they can buy more than  Max Supply 
            expect(Voyager.mintTicket(1)).to.be.reverted
            /// Rejection when funding has been reached 
            expect(Voyager.intiateRejection()).to.be.reverted;
        })
        it("Intiate Funding",async() =>{
            /// to check onlyProposalCreator()
            expect(Voyager.withdrawFunds(creator.address,withdrawAmount)).to.be.reverted
            /// to check onlyWhenNotPaused()
            expect(Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount)).to.be.reverted
            /// Intiate Funding
            await Voyager.connect(creator).intiateProposalFunding()
            expect(await Voyager.pause()).to.be.false
        })
        it("withdraw funds by creator and submit milestone",async() => {
            let prevBalance =  await token.balanceOf(creator.address)
            await Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount) 
            let afterBalance = await token.balanceOf(creator.address)
            let diff = afterBalance.sub(prevBalance)
            expect(diff).to.be.equal(withdrawAmount)
            expect(await Voyager.pause()).to.be.true
            expect(await Voyager.numberOfMileStones()).to.be.equal(1)
            /// Milestone Submition
            let milestone = "www.xyz.com"
            await Voyager.connect(creator).submitMileStoneInfo(milestone)
            let a = await Voyager.mileStone(0)
            expect(a).to.be.equal(milestone)
        })  
        it("Claimback when Proposal is  rejected and if stake can be withdrawn",async () => {
            /// To check if the unpause is working or not
            await Voyager.validate(true,false)
            expect(await Voyager.pause()).to.be.false
            /// To check if the pause is working or not
            await Voyager.validate(false,false)
            expect(await Voyager.pause()).to.be.true
            //// To check if Proposal is rejected is rejected or not
            await Voyager.validate(false,true)
            expect(await Voyager.isProposalRejected()).to.be.true
            //// TO check if after 1 withdrawal will the users get claimback,and will it work properly
            const numberOfNFTs = await Voyager.balanceOf(buyer.address)
            let val = await Voyager.stakingAmount()
            let fundsInReserve = await Voyager.fundsInReserve()
            let refundValue =  val.add(fundsInReserve)
            let amount  = await Voyager.refundAmount(refundValue)
            amount = amount.mul(numberOfNFTs)
            // to check the balance difference of user
            let prevBalance =  await token.balanceOf(buyer.address)
            await Voyager.connect(buyer).claimback()
            let afterBalance = await token.balanceOf(buyer.address)
            let diff = afterBalance.sub(prevBalance)
            expect(diff).to.be.equal(amount)
        })
    })
    describe("Voyager Holder ,Validation & Yield Submission", () => {
        let [owner, creator, creator2, buyer, buyer2 ]: SignerWithAddress[] = new Array(5)
        before(async () => {
            [owner,creator, creator2, buyer,buyer2] = await ethers.getSigners()    
        })
        let accessmaster : AccessMaster
        let Voyager: TokenFestHolder
        let token : MyToken

        const proposalDetails = [
            "10000000000000000000",
            600,
            1200,
            "1000000000000000000"
        ]
        let Addr;
        let mintAmount = "100000000000000000000"
        before(async () => {
            const AccessMasterFactory = await ethers.getContractFactory("AccessMaster")
            accessmaster = await AccessMasterFactory.deploy()
            const TokenFactory = await ethers.getContractFactory("MyToken")

            token = await TokenFactory.deploy()
            Addr = [token.address,accessmaster.address]
            let  VoyagerFactory = await ethers.getContractFactory("TokenFestHolder")
            Voyager = await VoyagerFactory.deploy(creator.address , "My Event","EVE",proposalDetails,20,"www.xyz",Addr)
            /// MINT ERC20 TOkens
            await token.mint(mintAmount)
            await token.connect(creator).mint(mintAmount)
            await token.connect(buyer).mint(mintAmount)
            await token.connect(buyer2).mint(mintAmount)
            /// STAKE
            let VoyagerCreator = Voyager.connect(creator)
            let val = await Voyager.crowdFundingGoal()
            val = (val.mul(20)).div(100)
            await token.connect(creator).approve(Voyager.address,val)
            await VoyagerCreator.stake(val)
        })
        it("Validation",async()=>{
            await network.provider.send("hardhat_mine", ["0x400"]);
            let val = await Voyager.salePrice()
            val = val.mul(8)
            /// Buyer will mint 8 tokens
            await token.connect(buyer).approve(Voyager.address,val)
            await Voyager.connect(buyer).mintTicket(8)
            /// Buyer2 will buy 2 more tokens
            await token.connect(buyer2).approve(Voyager.address,val)
            await Voyager.connect(buyer2).mintTicket(2)
            /// Intiate Funding
            await Voyager.connect(creator).intiateProposalFunding()
            let withdrawAmount = await Voyager.stakingAmount();
            /// Withdraw first round
            await Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount)
            for (let i = 0; i < 3; i++) {
                expect(await Voyager.validate(true,false)).to.emit(Voyager,"Validate").withArgs(true,false,false)
                await Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount)
            }
            expect(await Voyager.numberOfMileStones()).to.be.equal(4)
            /// TO check if somehow unpause can the event organisor take more than funds in Reserve
            await Voyager.validate(true,false)
            await Voyager.connect(creator).withdrawFunds(creator.address,"1000000000000000000")
            await Voyager.validate(true,false)
            expect(Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount)).to.be.revertedWith("VoyagerCollab: Process cannot proceed , more than reserve fund")
            await Voyager.connect(creator).withdrawFunds(creator.address,"1000000000000000000")
            await Voyager.validate(true,false)
            await Voyager.unpauseOrPauseByOperator(false)
            expect(Voyager.connect(creator).withdrawFunds(creator.address,"1000000000000000000")).to.be.reverted
        })
        it("Claimback && Yield Submission",async() =>{
            expect(Voyager.connect(creator).unStake()).to.be.revertedWith("TokenFestHolder: User cannot withdraw funds")
            let value = await Voyager.yeildToBeRecieved()

            await token.connect(creator).approve(Voyager.address,value)
            
            expect(await Voyager.connect(creator).yieldSubmission()).to.emit(Voyager,"YieldSubitted").withArgs(true,value)

            //// CLAIMBACK AFTER YIELD IS SUBMITTED
            const numberOfNFTs = await Voyager.balanceOf(buyer.address)
            let val = await Voyager.totalSupply()
            let refundValue =  value.div(val)
            let amount  = refundValue.mul(numberOfNFTs)
            // to check the balance difference of user
            let prevBalance =  await token.balanceOf(buyer.address)
            await Voyager.connect(buyer).claimback()
            let afterBalance = await token.balanceOf(buyer.address)
            let diff = afterBalance.sub(prevBalance)
            expect(diff).to.be.equal(amount)
            /// UNSTAKE
            let amount1  = await Voyager.stakingAmount()
            let prevBalance1 =  await token.balanceOf(creator.address)
            await Voyager.connect(creator).unStake()
            let afterBalance1 = await token.balanceOf(creator.address)
            let diff1 = afterBalance1.sub(prevBalance1)
            expect(diff1).to.be.equal(amount1)
        })
    })
     describe("Voyager Holder ,Yield Submission When Yiled Fund not sufficient", () => {
        let [owner, creator, creator2, buyer, buyer2 ]: SignerWithAddress[] = new Array(5)
        before(async () => {
            [owner,creator, creator2, buyer,buyer2] = await ethers.getSigners()    
        })
        let accessmaster : AccessMaster
        let Voyager: TokenFestHolder
        let token : MyToken

        const proposalDetails = [
            "10000000000000000000",
            600,
            1200,
            "1000000000000000000"
        ]
        let Addr;
        let mintAmount = "100000000000000000000"
        before(async () => {
            const AccessMasterFactory = await ethers.getContractFactory("AccessMaster")
            accessmaster = await AccessMasterFactory.deploy()
            const TokenFactory = await ethers.getContractFactory("MyToken")

            token = await TokenFactory.deploy()
            Addr = [token.address,accessmaster.address]
            let  VoyagerFactory = await ethers.getContractFactory("TokenFestHolder")
            Voyager = await VoyagerFactory.deploy(creator.address , "My Event","EVE",proposalDetails,20,"www.xyz",Addr)


            let VoyagerCreator = Voyager.connect(creator)
            let val = await Voyager.crowdFundingGoal()
            val = (val.mul(20)).div(100)
            /// MINT ERC20 TOkens
            await token.mint(mintAmount)
            await token.connect(creator).mint(val)
            await token.connect(buyer).mint(mintAmount)
            /// STAKE
            await token.connect(creator).approve(Voyager.address,val)
            await VoyagerCreator.stake(val)
        })
        it("Claimback if Event Organisor don't have yield fund",async()=>{
             await network.provider.send("hardhat_mine", ["0x400"]);
            let val = await Voyager.salePrice()
            val = val.mul(8)
            /// Buyer will mint 8 tokens
            await token.connect(buyer).approve(Voyager.address,val)
            await Voyager.connect(buyer).mintTicket(8)
            /// Buyer2 will buy 2 more tokens
            await token.approve(Voyager.address,val)
            await Voyager.mintTicket(2)
      
            await Voyager.connect(creator).intiateProposalFunding()
            let withdrawAmount = await Voyager.stakingAmount();
            await Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount)
            /// Withdraw first round
            for (let i = 0; i < 4; i++) {
                expect(await Voyager.validate(true,false)).to.emit(Voyager,"Validate").withArgs(true,false,false)
                await Voyager.connect(creator).withdrawFunds(creator.address,withdrawAmount)
            }
            expect(await Voyager.numberOfMileStones()).to.be.equal(5)
            expect(await Voyager.fundsInReserve()).to.be.equal(0)

            let fundToRecieve = await Voyager.yeildToBeRecieved()
            await token.connect(creator).approve(Voyager.address,fundToRecieve)
            await Voyager.connect(creator).yieldSubmission()


            //// CLAIMBACK AFTER YIELD IS SUBMITTED
            const numberOfNFTs = await Voyager.balanceOf(buyer.address)
            let supply = await Voyager.totalSupply()
            let refundValue =  fundToRecieve.div(supply)
            let amountToClaim  = refundValue.mul(numberOfNFTs)
            // to check the balance difference of user
            let prevBalance =  await token.balanceOf(buyer.address)
            await Voyager.connect(buyer).claimback()
            let afterBalance = await token.balanceOf(buyer.address)
            let diff = afterBalance.sub(prevBalance)
            expect(diff).to.be.equal(amountToClaim)
            
            await Voyager.validate(true,false)

            expect(Voyager.connect(creator).unStake()).to.be.revertedWith("TokenFestHolder: Not Enough Staking Funds")

        })
       
    })

