import { GetContractInstance } from "../services/ContractFactory";
import {
    LUNGO_NFT_CONTRACT_ADDRESS
} from './contractsInfo';
import nftABI from '../data/LungoNFT.json';


export const GetNFTImageById = async (tokenId) => {

  const NFTContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI);

  const uri = await NFTContract.tokenURI(tokenId);
  const result = await fetch(uri);
  const jsonResult = await result.json();

  return jsonResult;

}

export default GetNFTImageById();
