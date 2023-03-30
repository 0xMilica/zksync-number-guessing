import { Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";
import { BigNumber } from "ethers";

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
  const rewardTokenArtifact = await deployer.loadArtifact("RewardToken");


  const multiplier = BigNumber.from(10).pow(18);
  const amount = BigNumber.from(1000).mul(multiplier);
  const constructorArguments = [amount];
  
  console.log(`Deploying ${rewardTokenArtifact.contractName}, with constructor arguments: ${JSON.stringify(constructorArguments)}`);
  const rewardTokenContract = await deployer.deploy(rewardTokenArtifact, constructorArguments);

  const contractAddress = rewardTokenContract.address;
  console.log(`${rewardTokenArtifact.contractName} was deployed to ${contractAddress}`);
}
