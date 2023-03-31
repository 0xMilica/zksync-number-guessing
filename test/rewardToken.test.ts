import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { RewardToken } from "../typechain-types";

async function fixture() {
    const deployer = await ethers.getContractFactory("RewardToken");
    const [owner, otherAccount] = await ethers.getSigners();

    const initialMintAmount = 100;
    const rewardTokenContract = await deployer.deploy(initialMintAmount) as RewardToken;

    return {
        rewardTokenContract,
        owner,
        otherAccount
    }
}

describe("Reward token", () => {
    let fixtureResult: Awaited<ReturnType<typeof fixture>>;

    beforeEach(async () => {
        fixtureResult = await loadFixture(fixture);
    })

    describe("Access control", () => {
        it("should be able to mint tokens", async () => {
            const { rewardTokenContract, owner } = fixtureResult;
            const randomAccountAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
            const amountToMint = 100;

            const previousBalance = await rewardTokenContract.balanceOf(randomAccountAddress);
            expect(previousBalance).to.be.equal(0);

            await rewardTokenContract.connect(owner).mint(randomAccountAddress, amountToMint);
            const newBalance = await rewardTokenContract.balanceOf(randomAccountAddress);
            expect(newBalance).to.be.equal(amountToMint);
        });

        it("shouldn't mint if not owner", async () => {
            const { rewardTokenContract, otherAccount } = fixtureResult;
            const randomAccountAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
            const amountToMint = 100;

            await expect(
                rewardTokenContract.connect(otherAccount).mint(randomAccountAddress, amountToMint)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        })
    })
})