# basic-counter

Counter is a simple decentralized application (DApp) built on the Ethereum blockchain that allows users to increase a counter by paying a certain amount of native EVM currency (ETH/FTM/Matic...) (in wei) for each increment. The project showcases the interaction between a web application and a smart contract on any EVM compatible network using Web3.js. Users can connect their wallets to the DApp using MetaMask and increase the counter by paying 0.01 native network token for each increment.

Features

    Increment Counter: Users can increase the counter by paying 0.01 Matic for each increment.
    MetaMask Integration: The web application integrates with MetaMask, enabling users to connect their Ethereum wallets and sign transactions securely.
    Automatic Count Update: The count is automatically fetched from the smart contract every 5 seconds, ensuring users see the most up-to-date count.
    Connected Wallet Info: The website displays the connected wallet address and the number of times the connected wallet has incremented the counter.

Technology Stack:

    Solidity: The smart contract language used to define the "Counter12" smart contract and its functions.
    HTML/CSS: The frontend of the website that allows users to interact with the smart contract through a user-friendly interface.
    JavaScript: The JavaScript code facilitates the interaction between the website and the EVM-compatible smart contract using the web3.js library.
    web3.js: The JavaScript library used to connect the website to the EVM-compatible blockchain network and interact with the "Counter12" smart contract.

Deployment:
The "Counter12" smart contract is deployed on an EVM-compatible blockchain network (e.g., Ethereum Mainnet, Ropsten Testnet, Binance Smart Chain, Polygon, etc.) using Remix IDE or another preferred Ethereum development environment. The frontend website is hosted on a web server to allow users to access and interact with the smart contract using their EVM-compatible wallets (e.g., MetaMask with the appropriate network selected).

Instructions:

    Connect Wallet: Users need to connect their EVM-compatible wallets (e.g., MetaMask) to the website and select the appropriate network.
    Increment Count: Users can input the desired number of increments and click the "Increase Count" button to perform the operation, paying 0.01 Matic (or equivalent) for each increment.
    Fund Withdrawal: The contract owner can withdraw accumulated funds from user payments by clicking the "Withdraw Funds" button.

Note:
This project is for educational and demonstration purposes and should not be used for production deployment without proper security audits and additional features. Always exercise caution when handling real funds and smart contracts on any EVM-compatible blockchain network.
