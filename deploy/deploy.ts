import { Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";

dotenv.config();

const {
    WALLET_PRIVATE_KEY
} = process.env;

export default async function (hre: HardhatRuntimeEnvironment) {
  if (!WALLET_PRIVATE_KEY) {
    throw new Error("Please provide a private key in your .env");
  }

  const wallet = new Wallet(WALLET_PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Greeter");

  const greeting = "Hi there!";

  const greeterContract = await deployer.deploy(artifact, [greeting]);

  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
