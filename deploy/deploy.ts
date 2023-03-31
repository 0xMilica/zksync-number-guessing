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

  const multiplier = BigNumber.from(10).pow(18);
  const amount = BigNumber.from(1000).mul(multiplier);
  const rewardTokenConstructorArguments = [amount];
  
  const rewardTokenArtifact = await deployer.loadArtifact("RewardToken");
  console.log(`Deploying ${rewardTokenArtifact.contractName}, with constructor arguments: ${JSON.stringify(rewardTokenConstructorArguments)}`);
  const rewardTokenContract = await deployer.deploy(rewardTokenArtifact, rewardTokenConstructorArguments);
  console.log(`${rewardTokenArtifact.contractName} was deployed to ${rewardTokenContract.address}`);

  const rewardTokenAddress = rewardTokenContract.address;
  const numberGuessingConstructorArguments = [rewardTokenAddress];

  const numberGuessingArtifact = await deployer.loadArtifact("NumberGuessing");
  console.log(`Deploying ${numberGuessingArtifact.contractName}, with constructor arguments: ${JSON.stringify(numberGuessingConstructorArguments)}`);
  const numberGuessingContract = await deployer.deploy(numberGuessingArtifact, numberGuessingConstructorArguments);
  console.log(`${numberGuessingArtifact.contractName} was deployed to ${numberGuessingContract.address}`);

  await rewardTokenContract.transferOwnership(numberGuessingContract.address);
  console.log("Ownership transfered to the NumberGuessing contract");
}
