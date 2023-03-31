// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./interfaces/INumberGuessing.sol";
import "./interfaces/IRewardToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NumberGuessing is INumberGuessing, Ownable, ReentrancyGuard {
    /**
    1	    0.01%
    5	    0.05%
    10	    0.1%
    50	    0.5%
    100	    1%
    1000	10%
    10000	100%
    */
    uint constant MAX_BPS = 10000; 
    uint constant WINNING_PERCENTAGE = 8000;

    // 0.001 ETH in wei
    uint constant BETTING_FEE = 1000000000000000; 

    uint private _secret;
    address public rewardTokenAddress;

    constructor(address rewardTokenAddress_) {
        rewardTokenAddress = rewardTokenAddress_;
    }

    function setSecret(uint secret) external override onlyOwner {
        _secret = secret;
    }
    
    function guessSecret(uint guess) external override payable nonReentrant {
        require(msg.value == BETTING_FEE, "NumberGuessing: Betting fee must be the exact value");

        if (guess == _secret) {
            // Danger of reentrancy attack during the payout, so we use nonReentrant modifier for this reason.
            _payout(msg.sender);
            
            emit Winner(msg.sender);
        } else {
            emit Loser(msg.sender);
        }
    }

    function _payout(address winnerAddress) private {
        // ETH Payout (80% of total contract balance)
        uint contractEtherBalance = address(this).balance;
        uint etherAmountWon = contractEtherBalance * WINNING_PERCENTAGE / MAX_BPS; // We are using basis points to calculate more precise final value
        (bool success, ) = msg.sender.call{ value: etherAmountWon }("");
        require(success, "NumberGuessing: Payout transfer failed.");

        // ERC20 Token payout (100 rewawrd tokens)
        uint tokenDecimals = ERC20(rewardTokenAddress).decimals();
        uint amountToMint = 100;
        uint amountParsed = amountToMint * 10**tokenDecimals;
        IRewardToken(rewardTokenAddress).mint(winnerAddress, amountParsed);
    }
}