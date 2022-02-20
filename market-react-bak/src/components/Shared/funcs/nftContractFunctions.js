import GetContractInstance from "../../../services/ContractFactory";
import {
    LUNGO_NFT_CONTRACT_ADDRESS
} from './contractsInfo';
import nftABI from '../contracts/LungoNFT.json';


export const GetNFTImageById = async (tokenId) => {

    const NFTContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI);

    let uri = await NFTContract.tokenURI(tokenId);
    let result = await fetch(uri);
    let jsonResult = await result.json();

    return jsonResult.image;

}

export const GetNFTSByAddress = async (address) => {

    const NFTContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI);

    let balance = await NFTContract.balanceOf(address);
    balance = balance.toNumber();

    let tokens = [];

    for (let index = 0; index <= balance - 1; index++) {
        let tokenId = await NFTContract.tokenOfOwnerByIndex(address, index);
        tokenId = tokenId.toNumber();
        const uri = await NFTContract.tokenURI(tokenId);

        let result = await fetch(uri);
        let jsonResult = await result.json();

        tokens.push(jsonResult);

    }

    return tokens;

}