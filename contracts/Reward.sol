//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor() ERC20("Reward", "TRWD") {
        _mint(msg.sender,  5000000000000000 * 10 ** 18);
    }
    function mintTokens(uint256 amount) public onlyOwner {
    _mint(msg.sender, amount* 10 ** 18);
}


}