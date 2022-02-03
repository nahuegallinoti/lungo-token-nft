import {
    ethers
} from 'ethers';

const {
    ethereum
} = window;

export default function GetContractInstance(contractAddress, abi) {

    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, abi, signer);

    } else {
        console.log("Ethereum object does not exist");
    }

}