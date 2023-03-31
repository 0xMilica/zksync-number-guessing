import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { NumberGuessing, RewardToken } from "../typechain-types";

async function fixture() {
    const tokenDeployer = await ethers.getContractFactory("RewardToken");
    const guessingDeployer = await ethers.getContractFactory("NumberGuessing");
    const [owner] = await ethers.getSigners();

    const initialMintAmount = 100;
    const rewardTokenContract = await tokenDeployer.deploy(initialMintAmount) as RewardToken;

    const guessingContract = await guessingDeployer.deploy(rewardTokenContract.address) as NumberGuessing;
    await rewardTokenContract.transferOwnership(guessingContract.address);

    return {
        guessingContract,
        rewardTokenContract,
        owner
    }
}

describe("NumberGuessing", () => {
    let fixtureResult: Awaited<ReturnType<typeof fixture>>;

    beforeEach(async () => {
        fixtureResult = await loadFixture(fixture);
    })

    describe("Secret guessing", () => {
        it("should emit Winner if correct secret guessed", async () => {
            const { guessingContract, owner } = fixtureResult;
            const newSecret = 5;
            const ethValue = ethers.utils.parseEther("0.001");

            await guessingContract.setSecret(newSecret);

            await expect(
                guessingContract.connect(owner).guessSecret(newSecret, { value: ethValue })
            ).to.emit(guessingContract, "Winner").withArgs(owner.address);
        })

        it("should emit Loser for a wrong guess", async () => {
            const { guessingContract, owner } = fixtureResult;
            const newSecret = 5;
            const ethValue = ethers.utils.parseEther("0.001");

            await guessingContract.setSecret(3);

            await expect(
                guessingContract.connect(owner).guessSecret(newSecret, { value: ethValue })
            ).to.emit(guessingContract, "Loser").withArgs(owner.address);
        })
    })
})