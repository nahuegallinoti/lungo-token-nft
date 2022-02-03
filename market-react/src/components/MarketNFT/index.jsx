import React, { useContext, useEffect } from "react";
import { AccountContext } from "../Context/AccountContext";
import { LUNGO_TOKEN_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS, LUNGO_NFT_CONTRACT_ADDRESS } from '../Shared/funcs/contractsInfo';
import lungoTokenABI from '../Shared/contracts/LungoToken.json';
import marketABI from '../Shared/contracts/MarketNFT.json';
import nftABI from '../Shared/contracts/LungoNFT.json';
import { formatEther } from '../Shared/funcs/funcs';
import GetContractInstance from "../../services/ContractFactory";
import { MintButton } from "../Navbar/NavbarElements";
import { DivCenter } from '../Shared/GlobalElements';
import NFT from "../Shared/components/NFT";


const MarketNFT = () => {

    const { account } = useContext(AccountContext);

    const [marketContract, setMarketContract] = React.useState(null);
    const [lungoTokenContract, setLungoTokenContract] = React.useState(null);
    const [NFTContract, setNFTContract] = React.useState(null);

    const [nftsLoaded, setNftsLoaded] = React.useState(false);

    const [activeListingCount, setActiveListingCount] = React.useState(-1);
    const [nftListed, setNFTListed] = React.useState([]);


    useEffect(() => {
        setMarketContract(GetContractInstance(MARKETPLACE_CONTRACT_ADDRESS, marketABI));
        setLungoTokenContract(GetContractInstance(LUNGO_TOKEN_CONTRACT_ADDRESS, lungoTokenABI));
        setNFTContract(GetContractInstance(LUNGO_NFT_CONTRACT_ADDRESS, nftABI));
    }, []);

    const showMarket = async () => {
        let nfts = [];

        await marketContract.getActiveListingsCount().then((count) => {

            setNFTListed([]);
            count = count.toNumber();
            setActiveListingCount(count);

            for (let i = 0; i < count; i++) {
                marketContract.getActiveListings(i).then((listing_id) => {
                    listing_id = listing_id.toNumber();
                    marketContract.listings(listing_id).then((listing) => {

                        getNFTImageById(listing_id).then((image) => {
                            let nft = {
                                token_id: listing.token_id.toNumber(),
                                price: formatEther(listing.price),
                                list_id: listing_id,
                                image: image
                            }
                            nfts.push(nft)
                        }).then(() => {
                            if (nfts.length === count) {
                                setNFTListed(nfts);
                                setNftsLoaded(true);
                            }
                        });
                    });
                });
            }
        });
    }

    const getNFTImageById = async (tokenId) => {
        let uri = await NFTContract.tokenURI(tokenId);
        let result = await fetch(uri);
        let jsonResult = await result.json();

        return jsonResult.image;
    }

    return (
        nftsLoaded ? nftListed.map((nft, index) =>
            <DivCenter key={index} >
                <NFT nft={nft} />
            </DivCenter>

        ) : <MintButton onClick={showMarket}>Show Market</MintButton>)

};

export default MarketNFT;