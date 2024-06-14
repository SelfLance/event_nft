const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // The contract factory to deploy the LSD contract
  const FACTORY = await hre.ethers.getContractFactory("Factory");

  const factoryName = process.env.FACTORY_NAME;
  const factoryTag = process.env.FACTORY_TAG;

  const factory = await FACTORY.deploy(factoryName, factoryTag);
  console.log(`FACTORY Contract Token deployed to: ${factory.target}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
