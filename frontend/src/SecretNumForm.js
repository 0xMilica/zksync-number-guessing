import React from "react";
import abi from "./guessingContract.abi.json";
import { NumberGuessingContractAddress } from "./constants";
import { 
    usePrepareContractWrite, 
    useContractWrite,
    useWaitForTransaction
} from 'wagmi'
import useDebounce from "./useDebounce";

const SecretNumForm = () => {
    const [secretNum, setSecretNum] = React.useState('')
    const debouncedSecretNum = useDebounce(secretNum, 500);

    const { config } = usePrepareContractWrite({
        address: NumberGuessingContractAddress,
        abi,
        functionName: 'setSecret',
        args: [parseInt(debouncedSecretNum)],
        enabled: Boolean(debouncedSecretNum),
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
                <p>Set secret number</p>
                <input 
                    type="number"
                    onChange={(e) => setSecretNum(e.target.value)}
                    placeholder="420"
                    value={secretNum}
                />
                <br/><br/>
                <button disabled={!write || isLoading}>
                    {isLoading ? 'Changing the secret...' : 'Submit'}
                </button>
                {isSuccess && (
                    <div>
                    Successfully updated the secret number!
                    <div>
                        <a href={`https://goerli.explorer.zksync.io/tx/${data?.hash}`} target="_blank">Block explorer</a>
                    </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default SecretNumForm;