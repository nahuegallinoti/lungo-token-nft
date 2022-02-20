import React from "react";
import { MainTitle } from "../components/Navbar/NavbarElements";
import { DivCenter } from '../components/Shared/GlobalElements';
import MarketNFT from "../components/MarketNFT";

const MarketPage = () => {

  return (
    <>
      <DivCenter>
        <MainTitle colorTitle='white'>Market</MainTitle>
      </DivCenter>
      <DivCenter>
        <MarketNFT></MarketNFT>
      </DivCenter>
    </>
  )
};

export default MarketPage;