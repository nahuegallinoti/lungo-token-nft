import React, { useContext, useEffect } from "react";
import { AccountContext } from "../../context/AccountContext.jsx";
import { 
  LUNGO_TOKEN_CONTRACT_ADDRESS, 
  MARKETPLACE_CONTRACT_ADDRESS, 
  LUNGO_NFT_CONTRACT_ADDRESS 
} from '../../helpers/contractsInfo.js';
import lungoTokenABI from '../../data/LungoToken.json';
import marketABI from '../../data/MarketNFT.json';
import nftABI from '../../data/LungoNFT.json';
import { formatEther } from '../../helpers/funcs.js';
import { getNFTImageById } from '../../helpers/nftContractFunctions';
import { GetContractInstance } from "../../services/ContractFactory.js";
import { NFT } from "./NFT";


export const MarketScreen = () => {

    const { account } = useContext(AccountContext);

    const [marketContract, setMarketContract] = React.useState(null);
    const [lungoTokenContract, setLungoTokenContract] = React.useState(null);
    const [NFTContract, setNFTContract] = React.useState(null);

    const [nftsLoaded, setNftsLoaded] = React.useState(false);

    const [activeListingCount, setActiveListingCount] = React.useState(-1);
    const [nftListed, setNFTListed] = React.useState([]);


    useEffect( async () => {
        await setMarketContract(GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI));
        await setLungoTokenContract(GetContractInstance(LUNGO_TOKEN_CONTRACT_ADDRESS, lungoTokenABI));
        await setNFTContract(GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI));
    }, []);

    const showMarket = () => {
      let nfts = [];

      marketContract.getActiveListingsCount().then((count) => {
        setNFTListed([]);
        count = count.toNumber();
        setActiveListingCount(count);

        for (let i = 0; i < count; i++) {
          marketContract.getActiveListings(i).then((listing_id) => {
            listing_id = listing_id.toNumber();
            marketContract.listings(listing_id).then((listing) => {
              getNFTImageById(listing.token_id.toNumber()).then(({ image, name, description }) => {
                let nft = {
                  token_id: listing.token_id.toNumber(),
                  price: formatEther(listing.price),
                  list_id: listing_id,
                  image,
                  description,
                  name
                }
                nfts.push(nft)
              }).then(() => {
                  if (nfts.length === count) {
                    let nfts2 = nfts.sort((a, b) => {
                      return a.token_id - b.token_id;
                    });
                    setNFTListed(nfts2);
                    setNftsLoaded(true);
                  }
                });
            });
          });
        }
      });
    }

    return (
      <div className="flex flex-wrap justify-center align-center">
        {
          nftsLoaded 
            ? 
              nftListed.map((nft, index) => <NFT key={nft.token_id} {...nft} />)
            : 
              <button onClick={showMarket}>Show Market</button>
        }
      </div>

)};
