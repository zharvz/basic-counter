# Counter Rank

Counter Rank is the version 3.0 of Counter, my simple decentralized application (DApp) built on any EVM compatible blockchain that started with a simple feature but grew and got another ones such as:

1) Increment Counter: Users can increase the counter by paying 0.01 native EVM currency for each increment.
2) MetaMask Integration: The web application integrates with MetaMask, enabling users to connect their wallets and sign transactions securely.
3) Automatic Count Update: The count is automatically fetched from the smart contract every 5 seconds, ensuring users see the most up-to-date count (manual refresh button included in this version).
4) Connected Wallet Info: The website displays the connected wallet address and the number of times the connected wallet has incremented the counter.
5) Rank:  The website displays a rank which retrieves wallets that used the increment function, sort them by the count amount and display in the website.
6) Featured Image: The website displays a image which is the latest that the wallet that did more than 100 increments sent through sending any image URL in the textbox while sending a increment

    The project showcases the interaction between a web application and a smart contract on any EVM compatible network using Web3.js. Users can connect their wallets to the DApp using MetaMask and interact with the contract through the straight forward front end.
    
Technology Stack:

    Solidity: The smart contract language used to define the "CounterRank" smart contract and its functions.
    HTML/CSS: The frontend of the website that allows users to interact with the smart contract through a user-friendly interface.
    JavaScript: The JavaScript code facilitates the interaction between the website and the EVM-compatible smart contract using the web3.js library.
    web3.js: The JavaScript library used to connect the website to the EVM-compatible blockchain network and interact with the "CounterRank" smart contract.

Deployment:
The "CounterRank" smart contract is deployed on an EVM-compatible blockchain network (e.g., Ethereum Mainnet, Ropsten Testnet, Binance Smart Chain, Polygon, Fantom, etc.) using Remix IDE or another preferred Ethereum development environment. The frontend website is hosted on a web server to allow users to access and interact with the smart contract using their EVM-compatible wallets (e.g., MetaMask with the appropriate network selected).

Instructions:

    Connect Wallet: Users need to connect their EVM-compatible wallets (e.g., MetaMask) to the website and select the appropriate network (user must have Metamask installed and unlocked but even without the wallet connected in the website the total count, top wallets ranking and featured image are automatically fetched).
    Increment Count: Users can input the desired number of increments and click the "Increase Count" button to perform the operation, paying 0.01 native token for each increment.
    Featured Image: after paying >100 increments user can set a new Featured Image after a increase of any amount. To set a new Featured Image, only a image link is required.
    
Note: have fun.
