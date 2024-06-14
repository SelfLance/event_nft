# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
Code Deployment
```
on BSC Testnet
npx hardhat run ./scripts/factoryContract_deploy.js --network bsc_test
Contract Address Log on terminal: 0x977BCFd69fb5E82bB07c3Bd5F6c41672bd2f15Ec
For Verify on Scan: 
npx hardhat verify --network bsc_test 0x977BCFd69fb5E82bB07c3Bd5F6c41672bd2f15Ec Ticket_Factory TKT
it will verify your contract address 

Successfully verified contract Factory on the block explorer.
https://testnet.bscscan.com/address/0x977BCFd69fb5E82bB07c3Bd5F6c41672bd2f15Ec#code
```