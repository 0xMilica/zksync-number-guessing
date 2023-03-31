import React from "react";
import abi from "./tokenContract.abi.json";
import { RewardTokenContractAddress } from "./constants";
import {
    useContractRead,
    useAccount
} from "wagmi";
import { BigNumber } from "ethers";

const TokenBalance = () => {
    const { address, isConnected } = useAccount()

    const { data: decimals } = useContractRead({
        address: RewardTokenContractAddress,
        abi,
        functionName: 'decimals'
    })

    const { data, isLoading } = useContractRead({
        address: RewardTokenContractAddress,
        abi,
        functionName: 'balanceOf',
        args: [address]
    })

    const formattedData = (data && decimals) ? 
        BigNumber.from(data).div(BigNumber.from(10).pow(decimals)).toString()
        : 
        0;

    return (
        isConnected ? 
        <div className="formBox">
            This account's balance of reward tokens: {isLoading ? "Loading..." : formattedData}
        </div>
        :
        <div className="formBox">
            Please connect your wallet to see the balance
        </div>
    )
}

export default TokenBalance;