import React, { useContext, useEffect } from "react";
import { DivCenter } from '../components/Shared/GlobalElements';
import { NFTContext } from "../components/Context/NFTContext";
import { AccountContext } from "../components/Context/AccountContext";
import NFT from "../components/Shared/components/NFT";
import { GetNFTSByAddress } from '../components/Shared/funcs/nftContractFunctions';

const MyNFTPage = () => {

  const { account } = useContext(AccountContext);
  const { nfts, setNFTS } = useContext(NFTContext);
  const [nftsLoaded, setNftsLoaded] = React.useState(false);

  useEffect(() => {
    GetNFTSByAddress(account).then((e) => {
      setNFTS(e);
      setNftsLoaded(true);
    });
  }, [account]);

  return (
    nftsLoaded ? nfts.map((nft, index) =>
      <DivCenter key={index} >
        <NFT nft={nft} />
      </DivCenter>
    ) : null
  )
};

export default MyNFTPage;