// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";

/**
 * @dev This Contract Module helps to deploy the
 * base Roles for the other flow contracts .
 * Every other Flow contract will retrieve the roles of the
 * ADMIN, OPERATOR, CREATOR, etc. from this.
 */
contract AccessMaster is AccessControlEnumerable {
    string public name = "My AccessMaster";
    string public symbol = "AM";
    uint8 public version = 1;

    bytes32 public constant FLOW_ADMIN_ROLE = keccak256("FLOW_ADMIN_ROLE");
    bytes32 public constant FLOW_OPERATOR_ROLE =
        keccak256("FLOW_OPERATOR_ROLE");
    bytes32 public constant FLOW_CREATOR_ROLE = keccak256("FLOW_CREATOR_ROLE");

    constructor() {
        _setupRole(FLOW_ADMIN_ROLE, _msgSender());

        _setRoleAdmin(FLOW_ADMIN_ROLE, FLOW_ADMIN_ROLE);
        _setRoleAdmin(FLOW_OPERATOR_ROLE, FLOW_ADMIN_ROLE);
        _setRoleAdmin(FLOW_CREATOR_ROLE, FLOW_OPERATOR_ROLE);

        // add Admin to operator and Creator
        grantRole(FLOW_OPERATOR_ROLE, _msgSender());
    }

    function updateName(
        string memory _name
    ) external onlyRole(FLOW_ADMIN_ROLE) {
        name = _name;
    }

    function updateSymbol(
        string memory _symbol
    ) external onlyRole(FLOW_ADMIN_ROLE) {
        symbol = _symbol;
    }

    /// @dev to check if the address {User} is the ADMIN
    function isAdmin(address user) external view returns (bool) {
        return hasRole(FLOW_ADMIN_ROLE, user);
    }

    /// @dev to check if the address {User} is the OPERATOR
    function isOperator(address user) external view returns (bool) {
        return hasRole(FLOW_OPERATOR_ROLE, user);
    }

    /// @dev to check if the address {User} is the CREATOR
    function isCreator(address user) external view returns (bool) {
        return hasRole(FLOW_CREATOR_ROLE, user);
    }
}
