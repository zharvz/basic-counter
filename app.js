const contractAddress = 'ADDRESS'; // Replace this with the address of your deployed ERC20 contract
const ABI = [
	// PLACE ABI HERE
];

const web3 = new Web3(window.ethereum);
const counterContract = new web3.eth.Contract(ABI, contractAddress);

let connectedWalletAddress = localStorage.getItem('connectedWallet') || 'Not Connected';
let incrementData = JSON.parse(localStorage.getItem('incrementData')) || {};
let currentCount = 0;

async function connectWallet() {
    try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        connectedWalletAddress = account;
        localStorage.setItem('connectedWallet', connectedWalletAddress);
        await updateIncrementData();
        await fetchCurrentCount(); // Fetch the current count from the smart contract
        updateCountDisplay();
        updateWalletInfo();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

async function fetchCurrentCount() {
    try {
        const count = await counterContract.methods.count().call();
        return parseInt(count);
    } catch (error) {
        console.error('Error fetching current count:', error);
        return 0; // Return 0 if there's an error while fetching
    }
}

async function updateIncrementData() {
    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const numIncrements = await counterContract.methods.increments(account).call();
        incrementData[account] = parseInt(numIncrements);
        localStorage.setItem('incrementData', JSON.stringify(incrementData));
    } catch (error) {
        console.error('Error updating increment data:', error);
    }
}

async function increaseCount() {
    try {
        const incrementAmount = parseInt(document.getElementById('incrementInput').value, 10) || 1; // Use 1 as the default if the input is not a valid number
        const costInWei = incrementAmount * 0.01 * 10**18; // Convert 0.01 Matic to wei
        await counterContract.methods.incrementBy(incrementAmount).send({ from: connectedWalletAddress, value: costInWei });
        await updateIncrementData(); // Fetch latest increment data after each increment
        await fetchCurrentCount(); // Fetch the current count from the smart contract after each increment
        updateCountDisplay();
        updateWalletInfo();
    } catch (error) {
        console.error('Error increasing count:', error);
    }
}

async function updateCountManually() {
    try {
        await fetchCurrentCount(); // Fetch the current count from the smart contract manually
        updateCountDisplay();
    } catch (error) {
        console.error('Error updating count manually:', error);
    }
}

async function withdrawFunds() {
    try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        await counterContract.methods.withdrawFunds().send({ from: account });
        alert('Funds withdrawn successfully!');
    } catch (error) {
        console.error('Error withdrawing funds:', error);
    }
}

async function updateCountDisplay() {
    const countElement = document.getElementById('count');
    countElement.textContent = currentCount;
}

function updateWalletInfo() {
    const walletAddressElement = document.getElementById('walletAddress');
    walletAddressElement.textContent = connectedWalletAddress;
    const numIncrementsElement = document.getElementById('numIncrements');
    numIncrementsElement.textContent = incrementData[connectedWalletAddress] || 0;
}

// Fetch the current count from the smart contract when the website loads
(async function () {
    try {
        const isMetaMaskConnected = window.ethereum && window.ethereum.selectedAddress;
        if (isMetaMaskConnected) {
            await connectWallet();
        } else {
            const count = await fetchCurrentCount(); // Fetch the current count from the smart contract
            currentCount = count; // Update the currentCount variable with the fetched count
            updateCountDisplay(); // Update the count display with the fetched count
            updateWalletInfo(); // Update the wallet info
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})();

// Fetch the current count from the smart contract every 5 seconds
setInterval(async function () {
    try {
        const count = await fetchCurrentCount(); // Fetch the current count from the smart contract
        currentCount = count; // Update the currentCount variable with the fetched count
        updateCountDisplay(); // Update the count display with the fetched count
        updateWalletInfo(); // Update the wallet info
    } catch (error) {
        console.error('Error during periodic update:', error);
    }
}, 5000);

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('increaseButton').addEventListener('click', increaseCount);
document.getElementById('updateCountButton').addEventListener('click', updateCountManually);
document.getElementById('withdrawButton').addEventListener('click', withdrawFunds);

