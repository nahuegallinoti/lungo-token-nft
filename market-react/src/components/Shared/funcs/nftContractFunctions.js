import GetContractInstance from "../../../services/ContractFactory";
import {
    LUNGO_NFT_CONTRACT_ADDRESS
} from './contractsInfo';
import nftABI from '../contracts/LungoNFT.json';


export const getNFTImageById = async (tokenId) => {

    const NFTContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI);

    let uri = await NFTContract.tokenURI(tokenId);
    let result = await fetch(uri);
    let jsonResult = await result.json();

    return jsonResult.image;

}

export default getNFTImageById();