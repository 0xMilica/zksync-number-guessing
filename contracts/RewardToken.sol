// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IRewardToken.sol";

contract RewardToken is IRewardToken, ERC20, Ownable {
    constructor(uint amount) ERC20("Reward Token", "RWRD") {
        _mint(msg.sender, amount);
    }

    function mint(address to, uint256 amount) public override {
        _mint(to, amount);
    }
}
