# Counter Rank
Counter Rank is the version 3.0 of Counter, my simple decentralized application (DApp) built on any EVM compatible blockchain that started with a simple feature but grew and got another ones such as:

1) Increment Counter: Users can increase the counter by paying 0.01 native EVM currency for each increment, allowing them to contribute to the overall count.
2) MetaMask Integration: The web application integrates with MetaMask, enabling users to connect their wallets and sign transactions securely, ensuring a seamless experience when using Counter Rank.
3) Automatic Count Update: The count is automatically fetched from the smart contract automatically when: the website is loaded, any count is made and every 5 seconds. This provides users with an up-to-date view of the counter (manual refresh button included in this version for additional control).
4) Connected Wallet Info: As users interact with Counter Rank, they can see their connected wallet address and the number of times that wallet has incremented the counter. This information helps users understand their impact on the overall count.
5) The website displays a rank which retrieves wallets that used the increment function, sorts them by the count amount, and displays this information in a user friendly format for users. By showcasing the top contributing wallets, Counter Rank encourages competition and continued engagement with the application.
6) Featured Image: The website showcases the most recent image submitted by a wallet that has completed over 100 increments. This feature not only adds visual appeal to the application but also serves as an incentive for users to contribute more than 100 increments, enhancing user participation and engagement.
  
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
