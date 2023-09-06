const contractAddress = 'CONTRACT'; // Replace this with the address of your deployed ERC20 contract
const ABI = [ 
	// CONTRACT ABI HERE
];

const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const increaseButton = document.getElementById('increaseButton');
const incrementInput = document.getElementById('incrementInput');
const topWalletsList = document.getElementById('topWallets');
const connectedWalletElement = document.getElementById('connectedWallet');
const currentCountElement = document.getElementById('currentCount');
const topWalletsStatusElement = document.getElementById('topWalletsStatus');
const refreshCountButton = document.getElementById('refreshCountButton');
const imageUrlInput = document.getElementById('imageUrlInput');
const numIncrementsElement = document.getElementById('numIncrements');
const featuredImageElement = document.getElementById('featuredImage');
const featuredImageStatusElement = document.getElementById('featuredImageStatus');

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

// Fetch the top wallets from the contract
async function fetchTopWallets() {
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

		return walletsData;
	} catch (error) {
		console.error('Error fetching top wallets:', error);
		return [];
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
		const imageUrl = imageUrlInput.value;

		const costInWei = incrementAmount * 0.01 * 10 ** 18;
		await counterContract.methods.incrementBy(incrementAmount, imageUrl).send({ from: connectedWalletAddress, value: costInWei });
		updateTopWallets();
		updateWalletInfo(); // Update the wallet information
		updateCurrentCount();
		updateFeaturedImage(); 

	} catch (error) {
		console.error('Error increasing count:', error);
	}
}

// Update the connected wallet information
function updateConnectedWalletInfo() {
	if (connectedWalletAddress) {
		connectedWalletElement.textContent = connectedWalletAddress;
	} else {
		connectedWalletElement.textContent = 'Not Connected';
	}
}

// Fetch data from the contract such as count and top wallets 
async function fetchData() {
	try {
		const count = await counterContract.methods.count().call();
		await updateTopWallets(); // Update the top wallets ranking
		return parseInt(count);
	} catch (error) {
		console.error('Error fetching current count:', error);
		return 'Loading... (Make sure you have Metamask installed)';
	}
}

// Update the current count on the page
async function updateCurrentCount() {
	try {
		const count = await fetchData();
		currentCountElement.textContent = count;
	} catch (error) {
		console.error('Error updating current count:', error);
	}
}

// Update top wallets ranking
async function updateTopWallets() {
	try {
		const walletsData = await fetchTopWallets();
		const topWalletsList = document.getElementById('topWallets'); // Get the ul element

		// Clear the existing list
		topWalletsList.innerHTML = '';

		// Update the topWalletsStatusElement content based on data availability
		if (walletsData.length === 0) {
			topWalletsStatusElement.textContent = 'Loading top wallets...';
		} else {
			topWalletsStatusElement.textContent = ''; // Clear loading message
			for (let i = 0; i < walletsData.length; i++) {
				const listItem = document.createElement('li');
				listItem.textContent = `Wallet: ${walletsData[i].wallet}, Count: ${walletsData[i].count}`;
				topWalletsList.appendChild(listItem);
			}
		}
	} catch (error) {
		console.error('Error updating top wallets:', error);
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
		await updateFeaturedImage(); 
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

// Update the featured image
async function updateFeaturedImage() {
    try {
        // Clear the existing image and display loading message
        featuredImageElement.src = '';
        featuredImageElement.style.display = 'none';
        featuredImageStatusElement.textContent = 'Loading...';

        const imageUrl = await counterContract.methods.featuredImageUrl().call();
        featuredImageElement.src = imageUrl;
        featuredImageElement.style.display = 'block';
        featuredImageStatusElement.textContent = ''; // Clear loading message
    } catch (error) {
        console.error('Error updating featured image:', error);
        featuredImageStatusElement.textContent = 'Error loading image';
    }
}

// Add event listener for network change
ethereum.on('chainChanged', () => {
    updateFeaturedImage();
});

// Fetch and update the current count every 5 seconds
setInterval(updateCurrentCount, 5000);
setInterval(updateFeaturedImage, 5000);
