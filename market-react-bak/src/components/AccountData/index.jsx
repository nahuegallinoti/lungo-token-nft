import { MainTitle } from '../Navbar/NavbarElements';
import { DivCenter } from '../Shared/GlobalElements';
import GetContractInstance from "../../services/ContractFactory";
import { LUNGO_TOKEN_CONTRACT_ADDRESS } from '../Shared/funcs/contractsInfo';
import lungoTokenABI from '../Shared/contracts/LungoToken.json';
import { useEffect, useState } from 'react';
import { formatEther } from '../Shared/funcs/funcs';

function AccountData(props) {

    const { address } = props;
    const contractToken = GetContractInstance(LUNGO_TOKEN_CONTRACT_ADDRESS, lungoTokenABI);

    let [balance, setBalance] = useState(null);
    let [symbol, setSymbol] = useState(null);

    useEffect(() => {
        contractToken.balanceOf(address).then(res => {
            setBalance(formatEther(res));
        });

        contractToken.symbol().then(res => {
            setSymbol(res);
        });
    }, [address]);


    return (
        <div>
            <MainTitle colorTitle='white'>Wallet Connected: {address}</MainTitle>
            <DivCenter>
                <MainTitle colorTitle='white'>Wallet Balance: {balance + ' ' + symbol}</MainTitle>
            </DivCenter>
        </div>
    )
}

export default AccountData;