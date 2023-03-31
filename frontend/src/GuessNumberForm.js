import React from "react";
import abi from "./guessingContract.abi.json";
import { NumberGuessingContractAddress } from "./constants";
import { 
    usePrepareContractWrite, 
    useContractWrite,
    useWaitForTransaction
} from 'wagmi'
import useDebounce from "./useDebounce";
import { ethers } from "ethers";

const GuessNumberForm = () => {
    const [secretNum, setSecretNum] = React.useState('')
    const debouncedSecretNum = useDebounce(secretNum, 500);

    const { config } = usePrepareContractWrite({
        address: NumberGuessingContractAddress,
        abi,
        functionName: 'guessSecret',
        args: [parseInt(debouncedSecretNum)],
        enabled: Boolean(debouncedSecretNum),
        overrides: {
            value: ethers.utils.parseEther("0.001")
        }
    })
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div className="formBox">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    write?.()
                  }}
            >
                <p>Guess the secret number</p>
                <input 
                    type="number"
                    onChange={(e) => setSecretNum(e.target.value)}
                    placeholder="544432"
                    value={secretNum}
                />
                <br/><br/>
                <button disabled={!write || isLoading}>
                    {isLoading ? 'Checking the guess...' : 'Submit'}
                </button>
                {isSuccess && (
                    <div>
                    TX Made! Check out the results on the <a href={`https://goerli.explorer.zksync.io/tx/${data?.hash}`} target="_blank">Block explorer</a>
                    </div>
                )}
            </form>
        </div>
    )
}

export default GuessNumberForm;