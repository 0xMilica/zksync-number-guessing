// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface INumberGuessing {
    /**
    @param secret - Secret number to be guessed by players during the game
    @notice - Can be called by admin only
    */
    function setSecret(uint secret) external;

    /**
    @param guess - The guessing number for a given player
    @notice - Emits Winner event in case of correct guess and Loser event otherwise 
    */
    function guessSecret(uint guess) external payable;

    event Winner(address winnerAddress);
    event Loser(address loserAddress);
}