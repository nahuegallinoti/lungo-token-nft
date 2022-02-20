import {
    ethers
} from "ethers";

import Noty from 'noty';
import "noty/lib/noty.css";
import "noty/lib/themes/nest.css";

const {
    ethereum
} = window;

export const ConnectWalletHandler = async (_account = null) => {

    if (!ethereum) {
        alert("Please install Metamask!");
    }

    if (_account) {
        return null;
    }

    let account = await getAccount();

    return account;
};

async function getAccount() {
    const {
        ethereum
    } = window;

    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        return account;
    } else {
        return null;
    }

}

export const formatEther = (num) => {
    let value = ethers.utils.formatEther(num);
    value = parseFloat(value).toFixed(2);
    return value;
}

export const showNotification = (type, message, position = 'topRight', timeout = 3000) => {
    new Noty({
        text: message,
        theme: 'nest',
        type: type,
        layout: position,
        timeout: timeout,
    }).show();

}