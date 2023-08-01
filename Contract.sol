// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Counter12 {
    address public owner;
    uint public count = 0;
    mapping(address => uint) public increments; // Track the number of increments per wallet address

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function increment() public returns (uint) {
        count += 1;
        increments[msg.sender] += 1; // Increment the count for the connected wallet address
        return count;
    }

    function incrementBy(uint amount) public payable returns (uint) {
        uint cost = amount * 0.01 ether; // Each number increased costs 0.01 Matic (converted to wei)
        require(msg.value >= cost, "Insufficient payment"); // Check if the user sent enough payment
        count += amount;
        increments[msg.sender] += amount; // Increment the count for the connected wallet address
        if (msg.value > cost) {
            // Refund excess payment
            payable(msg.sender).transfer(msg.value - cost);
        }
        return count;
    }

    function withdrawFunds() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No funds available for withdrawal");
        payable(owner).transfer(balance);
    }
}
