import React, { useContext } from "react";
import { MainTitle } from "../Navbar/NavbarElements";
import AccountData from "../AccountData";
import { AccountContext } from "../Context/AccountContext";

const Login = () => {

  const { account } = useContext(AccountContext);

  return (
    account ?
      <AccountData address={account}></AccountData> : <MainTitle colorTitle="white">Please connect to Metamask</MainTitle>
  );

};

export default Login;