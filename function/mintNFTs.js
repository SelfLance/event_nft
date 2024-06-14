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
    const contractAddress = process.env.NFT_CONTRACT;
    const abi = [
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "tokenId",
            type: "uint256[]",
          },
          {
            internalType: "string[]",
            name: "_newCID",
            type: "string[]",
          },
        ],
        name: "addTokenUriForNft",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    console.log("NFT Contract Address: ", contractAddress);
    // Instantiate the contract
    const contract = new web3.eth.Contract(abi, contractAddress);
    // Transaction details
    const tokenId = [1, 2, 3];
    const _newCID = [
      "https://tickting.com/1",
      "https://tickting.com/2",
      "https://tickting.com/3",
    ];
    const tx = {
      from: account.address,
      to: contractAddress,
      data: contract.methods.addTokenUriForNft(tokenId, _newCID).encodeABI(),
      gas: await contract.methods
        .addTokenUriForNft(tokenId, _newCID)
        .estimateGas({ from: account.address }),
      gasPrice: (await web3.eth.getGasPrice()) * 2,
    };
    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction NFT Minted:", receipt.transactionHash);
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
