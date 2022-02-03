import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    TitleAccount
} from "./NavbarElements";
import React, { useContext, useState, useEffect } from "react";
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
        <>
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
        </>
    );
};

export default Navbar;