require("dotenv").config();
import dotenv from "dotenv"
dotenv.config();
import "@nomicfoundation/hardhat-verify"
import "@nomiclabs/hardhat-truffle5"
import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter"
import "solidity-coverage"

import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'

import { task } from "hardhat/config"

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// TESTNET
const AMOY_RPC_URL = process.env.AMOY_RPC_URL || "https://polygon-amoy.g.alchemy.com/v2/api-key"
const SCROLL_RPC_URL = process.env.SCROLL_RPC_URL || "https://ETH-RPC-URL"

const MNEMONIC = process.env.MNEMONIC || "ajkskjfjksjkf ssfaasff asklkfl klfkas dfklhao asfj sfk klsfjs fkjs"
const PRIVATE_KEY = process.env.PRIVATE_KEY

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "lklsdkskldjklgdklkld"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Etherscan API key"


module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
        },
        // TESTNET NETWORKS
        amoy: {
            networkId: 80002,
            url: AMOY_RPC_URL,
            accounts: [PRIVATE_KEY],
            // accounts: {
            //   mnemonic: MNEMONIC,
            // },
        },
        scrollEth: {
            networkId: 11155111,
            url: SCROLL_RPC_URL,
            accounts: [PRIVATE_KEY],
            // accounts: {
            //   mnemonic: MNEMONIC,
            // },
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: {
            polygonAmoy: POLYGONSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 20000,
    },
}