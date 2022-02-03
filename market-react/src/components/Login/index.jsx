import React, { useContext } from "react";
import { CursorLink } from "../Navbar/NavbarElements";
import AccountData from "../AccountData";
import { ConnectWalletHandler } from '../Shared/funcs/funcs';
import { AccountContext } from "../Context/AccountContext";

const Login = () => {

  const { account } = useContext(AccountContext);

  return (
    account ?
      <AccountData address={account}></AccountData> : <CursorLink onClick={ConnectWalletHandler}>Click here to connect Metamask</CursorLink>
  );

};

export default Login;