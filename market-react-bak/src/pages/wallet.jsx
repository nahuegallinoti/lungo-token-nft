import React, {useContext} from "react";
import { MainTitle } from "../components/Navbar/NavbarElements";
import { DivCenter } from '../components/Shared/GlobalElements';
import { AccountContext } from "../components/Context/AccountContext";
import { Wallet } from "../components/Wallet";

const WalletPage = () => {

  const { account } = useContext(AccountContext);
    
    
    return (
      <DivCenter>
        <MainTitle colorTitle='white'>Wallet</MainTitle>
        <Wallet account={account}></Wallet>
      </DivCenter>
    )
  };
  
  export default WalletPage;