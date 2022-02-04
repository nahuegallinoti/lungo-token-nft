import React, { useContext } from "react";


import { AccountData } from "./AccountData.jsx";
import { ConnectWalletHandler } from '../../helpers/funcs.js';
import { AccountContext } from "../../context/AccountContext";
import { NotLoggedIn } from "./NotLoggedIn"

export const HomeScreen = () => {

  const { account } = useContext(AccountContext);

  return (
    account 
    ? <AccountData address={account} />
    : <NotLoggedIn />
  );

};
