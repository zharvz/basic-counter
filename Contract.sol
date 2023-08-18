// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract CounterRank {
    address public owner;
    uint public count = 0;
    mapping(address => uint) public increments; // Track the number of increments per wallet address
    address[] public walletAddresses; // Array to store wallet addresses

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function incrementBy(uint amount) public payable returns (uint) {
        uint cost = amount * 0.01 ether; // Each number increased costs 0.01 FTM (converted to wei)
        require(msg.value >= cost, "Insufficient payment"); // Check if the user sent enough payment
        count += amount;
        increments[msg.sender] += amount; // Increment the count for the connected wallet address
        
        // Update the walletAddresses array if the wallet is not yet in the array
        if (increments[msg.sender] == amount) {
            walletAddresses.push(msg.sender);
        }
        
        if (msg.value > cost) {
            // Refund excess payment
            payable(msg.sender).transfer(msg.value - cost);
        }
        return count;
    }

    function getTopWalletsInfo(uint8 topCount) public view returns (address[] memory, uint256[] memory) {
        require(topCount > 0, "Top count must be greater than 0");

        address[] memory topWallets = new address[](topCount);
        uint256[] memory topCounts = new uint256[](topCount);

        for (uint8 i = 0; i < topCount; i++) {
            address wallet = walletAddresses[i];
            topWallets[i] = wallet;
            topCounts[i] = increments[wallet];
        }

        return (topWallets, topCounts);
    }

    function getNumUniqueWallets() public view returns (uint256) {
        return walletAddresses.length;
    }    

    function withdrawFunds() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No funds available for withdrawal");
        payable(owner).transfer(balance);
    }
}
