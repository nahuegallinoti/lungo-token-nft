import React, { useState } from "react";
import lungoNftABI from '../Shared/contracts/LungoNFT.json';
import GetContractInstance from "../../services/ContractFactory";
import { MainTitle, MintButton } from '../Navbar/NavbarElements';
import {LUNGO_NFT_CONTRACT_ADDRESS} from '../Shared/funcs/contractsInfo';
import { showNotification } from "../Shared/funcs/funcs";

const MintNFT = () => {

  const [isMinting, setIsMinting] = useState(false);

  const mintNftHandler = async () => {
    try {

      setIsMinting(true);
      const nftContract = GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, lungoNftABI);

      let nftTxn = await nftContract.mint();

      await nftTxn.wait();

      showNotification('information', 'NFT minted successfully!');
      showNotification('information', 'TX Hash: ' + nftTxn.hash, 'bottom', 5000);
      setIsMinting(false);


    } catch (err) {
      console.log(err);
    }
  }

  return (
    !isMinting ?
    <MintButton onClick={mintNftHandler}>
      Mint NFT
    </MintButton> : <MainTitle colorTitle='white'>Minting...</MainTitle>
  );
}

export default MintNFT;