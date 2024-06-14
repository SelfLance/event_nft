const Web3 = require("web3");
require("dotenv").config();
async function main() {
  try {
    // Initialize provider and web3 instance
    const provider = new Web3.providers.HttpProvider(
      process.env.SEPOILA_TESTNET_RPC
    );
    const web3 = new Web3(provider);
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key is missing in the environment variables");
    }
    // Get the account from the private key
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // Contract address and ABI
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const abi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    // Instantiate the contract
    const contract = new web3.eth.Contract(abi, contractAddress);
    // Transaction details
    const tx = {
      from: account.address,
      to: contractAddress,
      data: contract.methods
        .transferOwnership("0x820e206fe2989C0aFb7BA4a02e0f64f5fF58B5Ed")
        .encodeABI(),
      gas: await contract.methods
        .transferOwnership("0x820e206fe2989C0aFb7BA4a02e0f64f5fF58B5Ed")
        .estimateGas({ from: account.address }),
      gasPrice: (await web3.eth.getGasPrice()) * 2,
    };
    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction mined:", receipt.transactionHash);
    console.log("Transction Receipt: ", receipt);
  } catch (error) {
    console.error("Error performing transaction:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
