// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IRewardToken {
    /**
    @param to - Address to which to mint new tokens
    @param amount - Amount of new tokens to mint

    @notice Only the owner of the contract is able to use this function 
     */
    function mint(address to, uint256 amount) external;
}