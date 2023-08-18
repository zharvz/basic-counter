const contractAddress = 'ADDRESS'; // Replace this with the address of your deployed ERC20 contract
const ABI = [
	// PLACE ABI HERE
];

const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const increaseButton = document.getElementById('increaseButton');
const incrementInput = document.getElementById('incrementInput');
const topWalletsList = document.getElementById('topWallets');
const connectedWalletElement = document.getElementById('connectedWallet');
const currentCountElement = document.getElementById('currentCount');
const refreshCountButton = document.getElementById('refreshCountButton');

refreshCountButton.addEventListener('click', updateCurrentCount);
connectButton.addEventListener('click', connectWallet);
disconnectButton.addEventListener('click', disconnectWallet);
increaseButton.addEventListener('click', increaseCount);

let connectedWalletAddress = null;
let web3 = null;
let counterContract = null;

// Initialize the counterContract instance
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    counterContract = new web3.eth.Contract(ABI, contractAddress);
}

// Update top wallets ranking
async function updateTopWallets() {
    try {
        const numUniqueWallets = await counterContract.methods.getNumUniqueWallets().call();
        const topWalletCount = numUniqueWallets;
        
        const result = await counterContract.methods.getTopWalletsInfo(topWalletCount).call();
        const topWallets = result[0];
        const topCounts = result[1];

        // Sort the topWallets and topCounts arrays based on the count in descending order
        const walletsData = [];
        for (let i = 0; i < topWallets.length; i++) {
            walletsData.push({ wallet: topWallets[i], count: topCounts[i] });
        }

        walletsData.sort((a, b) => b.count - a.count);

        // Clear the existing list
        topWalletsList.innerHTML = '';

        // Populate the sorted list
        for (let i = 0; i < walletsData.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = `Wallet: ${walletsData[i].wallet}, Count: ${walletsData[i].count}`;
            topWalletsList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error updating top wallets:', error);
    }
}


// Connect the wallet
async function connectWallet() {
    try {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            connectedWalletAddress = accounts[0];
            counterContract = new web3.eth.Contract(ABI, contractAddress);
            updateConnectedWalletInfo(); // Update the connected wallet information
            updateTopWallets(); // Update the top wallets ranking
            updateWalletInfo(); // Update the wallet information
        } else {
            console.error('Ethereum provider not detected');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}



// Disconnect the wallet
function disconnectWallet() {
    connectedWalletAddress = null;
    web3 = null;
    counterContract = null;
    topWalletsList.innerHTML = '';
}

// Increase the count
async function increaseCount() {
    try {
        if (!connectedWalletAddress || !counterContract) {
            console.error('Wallet not connected or contract not initialized');
            return;
        }
        
        const incrementAmount = parseInt(incrementInput.value, 10) || 1;
        const costInWei = incrementAmount * 0.01 * 10**18;
        await counterContract.methods.incrementBy(incrementAmount).send({ from: connectedWalletAddress, value: costInWei });
        updateTopWallets();
		updateWalletInfo(); // Update the wallet information
		updateCurrentCount();
    } catch (error) {
        console.error('Error increasing count:', error);
    }
}

// FROM NOW ON EXPERIMENTING

// Update the connected wallet information
function updateConnectedWalletInfo() {
    if (connectedWalletAddress) {
        connectedWalletElement.textContent = connectedWalletAddress;
    } else {
        connectedWalletElement.textContent = 'Not Connected';
    }
}

// Fetch the current count from the contract
async function fetchCurrentCount() {
    try {
        const count = await counterContract.methods.count().call();
        return parseInt(count);
    } catch (error) {
        console.error('Error fetching current count:', error);
        return 0;
    }
}

// Update the current count on the page
async function updateCurrentCount() {
    try {
        const count = await fetchCurrentCount();
        currentCountElement.textContent = count;
    } catch (error) {
        console.error('Error updating current count:', error);
    }
}

// Fetch the current count from the contract when the website loads
(async function () {
    try {
        const isMetaMaskConnected = window.ethereum && window.ethereum.selectedAddress;
        await updateCurrentCount(); // Fetch and update the current count immediately
        if (isMetaMaskConnected) {
            await connectWallet();
        } else {
            updateConnectedWalletInfo();
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})();

// Update the wallet information displayed on the page
async function updateWalletInfo() {
    if (connectedWalletAddress) {
        connectedWalletElement.textContent = connectedWalletAddress;
        const numIncrementsElement = document.getElementById('numIncrements');
        try {
            const numIncrements = await counterContract.methods.increments(connectedWalletAddress).call();
            numIncrementsElement.textContent = numIncrements;
        } catch (error) {
            console.error('Error fetching increment count:', error);
            numIncrementsElement.textContent = 'N/A';
        }
    } else {
        connectedWalletElement.textContent = 'Not Connected';
        // Reset other elements
        const numIncrementsElement = document.getElementById('numIncrements');
        numIncrementsElement.textContent = 'N/A';
    }
}



// Fetch and update the current count every 5 seconds
setInterval(updateCurrentCount, 5000);
