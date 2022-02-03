import React from "react";
import { ListItem, ListContainer } from "../../Shared/GlobalElements";

const NFT = (props) => {

    const { nft } = props;

    return (
        <>
            <ListContainer>
                <ListItem>Token Id: {nft.token_id}</ListItem>
                <ListItem>Price: {nft.price}</ListItem>
                <ListItem>List Id: {nft.list_id}</ListItem>
                <br />
                <img src={nft.image} alt="Lungo Logo" width={300} height={200} />
            </ListContainer>
        </>
    );

};

export default NFT;