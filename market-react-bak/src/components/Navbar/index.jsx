import React, { useContext, useState, useEffect } from "react";
import {
  NavLink
} from "react-router-dom";



import { AccountContext } from "../Context/AccountContext";
import { ConnectWalletHandler } from '../Shared/funcs/funcs';

const Navbar = () => {

    const { ethereum } = window;
    const { account, setAccount } = useContext(AccountContext);
    const [refresh, setRefresh] = useState(true);

    ethereum.on('accountsChanged', () => {
        setRefresh(false);
        setAccount(ethereum.selectedAddress);
        localStorage.setItem('addressAccount', ethereum.selectedAddress);
    })


    useEffect(() => {
        if (!refresh) return;
        setRefresh(false);
        ConnectWalletHandler().then((e) => {
            setAccount(e);
            localStorage.setItem('addressAccount', ethereum.selectedAddress);
        });
    }, [refresh, account, setAccount, ethereum.selectedAddress]);


    return (

    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <NavLink to='/' className="flex items-center mb-4 font-medium text-white title-font md:mb-0">
          <span className="ml-3 text-xl">Tailblocks</span>
        </NavLink>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700">
          <NavLink to='/' className="mr-5 hover:text-white">First Link</NavLink>
          <NavLink to='/' className="mr-5 hover:text-white">Second Link</NavLink>
          <NavLink to='/' className="mr-5 hover:text-white">Third Link</NavLink>
          <NavLink to='/' className="mr-5 hover:text-white">Fourth Link</NavLink>
        </nav>
        <button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-800 border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0">Button
        </button>
      </div>
    </header>

    );
};

export default Navbar;

{/*

            <Nav className={'navLogo'}>
                <NavLogo to="/login">
                    Lungo
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/mint"
                        activestyle={{ color: 'black' }}
                    >
                        Mint NFT
                    </NavLink>
                    <NavLink
                        to="/market"
                        activestyle={{ color: 'black' }}
                    >
                        Market
                    </NavLink>
                    <NavLink
                        to="/my-nft"
                        activestyle={{ color: 'black' }}
                    >
                        My NFT's
                    </NavLink>
                    <NavLink
                        to="/listings"
                        activestyle={{ color: 'black' }}
                    >
                        My Listings
                    </NavLink>
                    <NavLink
                        to="/staking"
                        activestyle={{ color: 'black' }}
                    >
                        Staking
                    </NavLink>
                    <NavBtn>
                        <NavBtnLink to="/login"><span>{account ? 'My Account' : 'Connect Account'}</span></NavBtnLink>
                    </NavBtn>
                </NavMenu>

                <TitleAccount>{account}</TitleAccount>
            </Nav>
*/}
