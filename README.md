# Counter Rank

Counter Rank is the version 2.0 of Counter, my simple decentralized application (DApp) built on any EVM compatible blockchain that allows users to increase a counter by paying a certain amount of native EVM currency (ETH/FTM/Matic...) (in wei) for each increment. The project showcases the interaction between a web application and a smart contract on any EVM compatible network using Web3.js. Users can connect their wallets to the DApp using MetaMask and increase the counter by paying 0.01 native network token for each increment. This version also includes a rank section sorted on the count amount each wallet did and some minor tweaks.

Features

    Increment Counter: Users can increase the counter by paying 0.01 native EVM currency for each increment.
    MetaMask Integration: The web application integrates with MetaMask, enabling users to connect their wallets and sign transactions securely.
    Automatic Count Update: The count is automatically fetched from the smart contract every 5 seconds, ensuring users see the most up-to-date count (manual refresh button included in this version).
    Connected Wallet Info: The website displays the connected wallet address and the number of times the connected wallet has incremented the counter.
    Rank Feature: This version includes a rank feature which retrieves wallets that used the increment function, sort them by the count amount and display in the website. 
    
Technology Stack:

    Solidity: The smart contract language used to define the "CounterRank" smart contract and its functions.
    HTML/CSS: The frontend of the website that allows users to interact with the smart contract through a user-friendly interface.
    JavaScript: The JavaScript code facilitates the interaction between the website and the EVM-compatible smart contract using the web3.js library.
    web3.js: The JavaScript library used to connect the website to the EVM-compatible blockchain network and interact with the "CounterRank" smart contract.

Deployment:
The "CounterRank" smart contract is deployed on an EVM-compatible blockchain network (e.g., Ethereum Mainnet, Ropsten Testnet, Binance Smart Chain, Polygon, etc.) using Remix IDE or another preferred Ethereum development environment. The frontend website is hosted on a web server to allow users to access and interact with the smart contract using their EVM-compatible wallets (e.g., MetaMask with the appropriate network selected).

Instructions:

    Connect Wallet: Users need to connect their EVM-compatible wallets (e.g., MetaMask) to the website and select the appropriate network.
    Increment Count: Users can input the desired number of increments and click the "Increase Count" button to perform the operation, paying 0.01 native token for each increment.
    Fund Withdrawal: The contract owner can withdraw accumulated funds from user payments by clicking the "Withdraw Funds" button.

Note: have fun.
