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
import { AccountContext } from "../Context/AccountContext";

import React, { useContext } from "react";
import { ConnectWalletHandler } from '../Shared/funcs/funcs';

const Navbar = () => {

    const { ethereum } = window;

    const { account, setAccount } = useContext(AccountContext);

    ethereum.on('accountsChanged', () => {
                setAccount(ethereum.selectedAddress);
                localStorage.setItem('addressAccount', ethereum.selectedAddress);
    })

    const handleConnection = async () => {

        let acc = await ConnectWalletHandler(account);
        setAccount(acc);
    };

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
                        to="/wallet"
                        activestyle={{ color: 'black' }}
                    >
                        Wallet
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
                        <NavBtnLink onClick={() => handleConnection()} to="/login"><span>{account ? 'Logout' : 'Connect Account'}</span></NavBtnLink>
                    </NavBtn>
                </NavMenu>

                <TitleAccount>{account}</TitleAccount>
            </Nav>
        </>
    );
};

export default Navbar;