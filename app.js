const contractAddress = 'ADDRESS'; // Replace this with the address of your deployed ERC20 contract
const ABI = [
	// PLACE ABI HERE
];

const web3 = new Web3(window.ethereum);
const counterContract = new web3.eth.Contract(ABI, contractAddress);

async function increaseCount() {
    try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const incrementAmount = parseInt(document.getElementById('incrementInput').value, 10) || 1; // Use 1 as the default if the input is not a valid number
        const costInWei = incrementAmount * 0.01 * 10**18; // Convert 0.01 Matic to wei
        await counterContract.methods.incrementBy(incrementAmount).send({ from: account, value: costInWei });
        await updateCountDisplay(); // Refresh count after increment
    } catch (error) {
        console.error('Error increasing count:', error);
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
    const count = await counterContract.methods.count().call();
    const countElement = document.getElementById('count');
    countElement.textContent = count;
}

document.getElementById('increaseButton').addEventListener('click', increaseCount);
document.getElementById('withdrawButton').addEventListener('click', withdrawFunds);
updateCountDisplay();
