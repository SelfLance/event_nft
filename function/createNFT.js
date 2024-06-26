const Web3 = require("web3");
require("dotenv").config();
async function main() {
  try {
    // Initialize provider and web3 instance
    console.log("process.env.BSC_SCAN_RPC : ", process.env.BSC_SCAN_RPC);
    const provider = new Web3.providers.HttpProvider(process.env.BSC_SCAN_RPC);
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
            internalType: "uint256",
            name: "totalTickets",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "mintPrice",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "tag",
            type: "string",
          },
        ],
        name: "createTicket",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    // Instantiate the contract
    const contract = new web3.eth.Contract(abi, contractAddress);
    // Transaction details
    const totalTickets = 1000;
    const mintPrice = 500000;
    const name = "POLO_TICKET";
    const tag = "PTKT";
    const tx = {
      from: account.address,
      to: contractAddress,
      data: contract.methods
        .createTicket(totalTickets, mintPrice, name, tag)
        .encodeABI(),
      gas: await contract.methods
        .createTicket(totalTickets, mintPrice, name, tag)
        .estimateGas({ from: account.address }),
      gasPrice: (await web3.eth.getGasPrice()) * 2,
    };
    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction NFT Created:", receipt.transactionHash);
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
