import { GetContractInstance } from "../../services/ContractFactory";
import { LUNGO_TOKEN_CONTRACT_ADDRESS } from '../../helpers/contractsInfo';
import lungoTokenABI from '../../data/LungoToken.json';
import { useEffect, useState } from 'react';
import { formatEther } from '../../helpers/funcs';

export const AccountData = ({ address }) => {

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
    <section className="text-gray-800 body-font">
      <div className="container flex flex-wrap items-center justify-center px-5 py-24 mx-auto">
        <div className="flex flex-wrap text-center">
          <div className="w-full p-4">
            <h2 className="text-3xl font-medium text-gray-500 title-font sm:text-4xl">{balance + ' ' + symbol}</h2>
            <p className="leading-relaxed">Wallet Balance</p>
          </div>
        </div>
      </div>
    </section>
  )
}

