Sure! Here's a well-structured and visually appealing `README.md` for your GitHub project:

---

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It includes a sample contract, a test for that contract, and a Hardhat Ignition module that deploys the contract.

## Getting Started

To get started, clone the repository and install the dependencies:

```shell
git clone https://github.com/SelfLance/event_nft.git
cd event_nft
npm install
```

## Available Scripts

In the project directory, you can run the following tasks:

### Help

```shell
npx hardhat help
```
### Compile Code
```shell
npx hardhat compile
```

### Deployment

Deploy the contract using Hardhat :
You could Choose your require deployment network all networks are configured in hardhat.config.js  
Below is deployed on local hardhat

```shell
npx hardhat run deploy ./scripts/factoryContract_deploy.js 
```

## Code Deployment

### Deploy on BSC Testnet

Deploy the contract:

```shell
npx hardhat run deploy ./scripts/factoryContract_deploy.js  --network bsc_test
```

Contract Address will be logged on the terminal:

```
0x977BCFd69fb5E82bB07c3Bd5F6c41672bd2f15Ec
```

### Verify on BSC Scan

Verify the deployed contract on BSC Scan:

```shell
npx hardhat verify --network bsc_test 0x977BCFd69fb5E82bB07c3Bd5F6c41672bd2f15Ec Ticket_Factory TKT
```

Once verified, you can check it on [BSC Testnet Explorer](https://testnet.bscscan.com/address/0x977BCFd69fb5E82bB07c3Bd5F6c41672bd2f15Ec#code).

## Scripts to Run NFT Creation and Minting

### Create NFTs

Run the script to create NFTs:

```shell
node ./function/createNFT.js
```

You can modify the following parameters in the script:

```javascript
const totalTickets = 1000;
const mintPrice = 500000;
const name = "POLO_TICKET";
const tag = "PTKT";
```

### Mint NFTs in Bulk

Run the script to mint NFTs in bulk:

```shell
node ./function/mintNFT.js
```

Modify the following parameters in the script according to your NFT ID and URI:

```javascript
const tokenId = ...; // specify the token ID
const _newCID = "..."; // specify the new CID
```

## License

This project is licensed under the MIT License.

---

This `README.md` provides a clear and concise overview of the project, instructions for setup and usage, and details for deploying and verifying contracts.