import React, { useContext, useState, useEffect } from "react";
import {
  NavLink,
  Link
} from "react-router-dom";



import { AccountContext } from "../../context/AccountContext";
import { ConnectWalletHandler } from "../../helpers/funcs.js";

export const NavbarComponent = () => {

    const { ethereum } = window;
    const { account, setAccount } = useContext(AccountContext);
    const [ refresh, setRefresh ] = useState(true);

  const handleConnectWallet = () => {

    ConnectWalletHandler().then((e) => {
      setAccount(e);
      localStorage.setItem('addressAccount', ethereum.selectedAddress);
    });

  }
  ethereum.on('accountsChanged', () => {
    setRefresh(false);
    setAccount(ethereum.selectedAddress);
    localStorage.setItem('addressAccount', ethereum.selectedAddress);
  })


    useEffect(() => {
      if (!refresh) return;
      setRefresh(false);
      handleConnectWallet();
    }, [refresh, account, setAccount, ethereum.selectedAddress]);


    return (

      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container flex flex-col flex-wrap items-center justify-between p-5 mx-auto md:flex-row">
          <NavLink to='/' className="flex items-center mb-4 font-medium text-white title-font md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 p-2 text-white bg-purple-500 rounded-full">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className="ml-3 text-xl">Lungo App</span>
          </NavLink>
          <nav className="flex flex-wrap items-start justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700">
            <NavLink to="/" 
              className={({isActive}) => (
                isActive
                  ? "mr-5 hover:text-white transition duration-1000 border-b-2 border-purple-500"
                  : "mr-5 hover:text-white transition hover:duration-1000 "
              )}
            >
              Home
            </NavLink> 

            <NavLink to="/listings" 
              className={({isActive}) => (
                isActive
                  ? "mr-5 hover:text-white transition duration-1000 border-b-2 border-purple-500"
                  : "mr-5 hover:text-white transition hover:duration-1000 "
              )}
            >
              Listings
            </NavLink> 

            <NavLink to="/staking" 
              className={({isActive}) => (
                isActive
                  ? "mr-5 hover:text-white transition duration-1000 border-b-2 border-purple-500"
                  : "mr-5 hover:text-white transition hover:duration-1000 "
              )}
            >
              Staking
            </NavLink> 

            <NavLink to="/my-nft" 
              className={({isActive}) => (
                isActive
                  ? "mr-5 hover:text-white transition duration-1000 border-b-2 border-purple-500"
                  : "mr-5 hover:text-white transition hover:duration-1000 "
              )}
            >
              My NFT
            </NavLink> 

            <NavLink to="/market" 
              className={({isActive}) => (
                isActive
                  ? "mr-5 hover:text-white transition duration-1000 border-b-2 border-purple-500"
                  : "mr-5 hover:text-white transition hover:duration-1000 "
              )}
            >
              Market
            </NavLink> 
          </nav>

          {
            account
              ?
              <div className="flex items-center px-4 -mx-2 -mr-20">
                  <h4 className="mx-2 font-medium text-white dark:text-gray-200 hover:underline">{ account.substring(0, 5) + '...' +  account.substring(account.length - 4)}</h4>
                  <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/>
              </div>
              : 
              <button 
                className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-800 border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0"
                onClick={ handleConnectWallet }
              >
                Login
              </button>
          }
        </div>
      </header>

    );
};
