import { Component, OnInit } from '@angular/core';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { Message } from 'src/app/models/message';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-mint-nft',
  templateUrl: './mint-nft.component.html',
  styleUrls: ['./mint-nft.component.scss']
})
export class MintNftComponent implements OnInit {

  minting: boolean = false;

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  contracts_data: ContractData = new ContractData();

  nft_contract: any;

  constructor(private _contractService: ContractService) {

    let contractNFT = this.contracts_data.contracts.find(x => x.contract_name == ContractName.LUNGO_NFT);

    this._contractService.getContract(contractNFT?.contract_abi, contractNFT?.contract_address).then(result => {
      this.nft_contract = result;
    });
  }


  ngOnInit(): void {

  }

  async mint() {
    this.minting = true;

    await this.nft_contract.mint().then((result: any) => {
      this.message = {
        action: 'Done',
        message: 'NFT minted successfully',
        data: result.hash,
      }

    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'NFT mint failed',
        data: err.message,
      }
    });

    this.minting = false;
  }

}