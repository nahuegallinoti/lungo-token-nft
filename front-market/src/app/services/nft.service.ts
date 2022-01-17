import { Injectable } from '@angular/core';
import { BigNumber, ethers } from "ethers";
import { NFT } from '../components/nft-data/nft-data.component';
import { ContractData, ContractName } from '../models/enum-contracts';
import { ContractService } from './contract.service';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})

export class NftService {

  nft_contract: any;
  contracts_data: ContractData = new ContractData();

  constructor(private _contractService: ContractService) {
    this.setNFTContract();
  }

  ngOnInit(): void {
  }

  async setNFTContract() {
    let contractNFT = this.contracts_data.contracts.find(x => x.contract_name == ContractName.LUNGO_NFT);

    if (contractNFT == undefined)
      return;

    this._contractService.getContract(contractNFT?.contract_abi, contractNFT?.contract_address).then(contract => {
      this.nft_contract = contract;
    });

  }

  async getNFTImage(list_nft: any[]): Promise<any[]> {

    for (let i = 0; i < list_nft.length; i++) {
      const nft = list_nft[i];

      let uri = await this.nft_contract.tokenURI(nft.id)
      let result = await fetch(uri)
      let jsonResult = await result.json()

      nft.image = jsonResult.image;

    }

    return list_nft;

  }

}