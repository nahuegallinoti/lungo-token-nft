import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';

@Component({
  selector: 'app-nft-data',
  templateUrl: './nft-data.component.html',
  styleUrls: ['./nft-data.component.scss']
})
export class NftDataComponent implements OnInit {

  @Input() account: Account = {
    address: '',
    balance: '',
  };

  contracts_data: ContractData = new ContractData();

  nftCount: number = -1;
  list_nft: any[] = [];

  nft_contract: any;
  token_contract: any;
  market_contract: any;

  price: string = '';

  message = {
    action: '',
    data: ''
  }

  constructor(private _contractService: ContractService, private _tokenService: TokenService) {

    this.setNFTContract();
    this.setTokenContract();
    this.setMarketContract();
  }

  ngOnInit(): void {
  }

  private async setNFTContract() {
    let contractNFT = this.contracts_data.contracts.find(x => x.contract_name == ContractName.LUNGO_NFT);

    if (contractNFT == undefined)
      return;

    this._contractService.getContract(contractNFT?.contract_abi, contractNFT?.contract_address).then(contract => {
      this.nft_contract = contract;
    });
  }

  private async setTokenContract() {
    let contractToken = this.contracts_data.contracts.find(x => x.contract_name == ContractName.LUNGO_TOKEN);

    if (contractToken == undefined)
      return;

    this._contractService.getContract(contractToken?.contract_abi, contractToken?.contract_address).then(contract => {
      this.token_contract = contract;
    });
  }
  private async setMarketContract() {
    let contractMarket = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    if (contractMarket == undefined)
      return;

    this._contractService.getContract(contractMarket?.contract_abi, contractMarket?.contract_address).then(contract => {
      this.market_contract = contract;
    });
  }


  private async countNFT() {
    this.nftCount = -1;

    await this.nft_contract.balanceOf(this.account.address).then((result: any) => {
      this.nftCount = result;
    }).catch((err: any) => {
      console.log(err.message);
    });

  }

  async showNFTs() {

    if (this.list_nft.length != 0) {
      this.list_nft = [];
      return;
    }

    await this.countNFT();

    if (this.nftCount == -1)
      return;

      let result: any[] = [];

    for (let i = 0; i < this.nftCount; i++) {
      await this.nft_contract.tokenOfOwnerByIndex(this.account.address, i).then((token: any) => {
        result.push(token);
      }).catch((err: any) => {
        alert(err.message);
      });
    }

    this.list_nft = result.sort((a, b) => {
      return a - b;
    })

  }

  async approve(token_id: any) {

    let market_contract = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    token_id = Number(token_id).toString()

    await this.nft_contract.approve(market_contract?.contract_address, token_id).then((result: any) => {
      this.message = {
        action: 'Approve successfully',
        data: result.hash
      };
    }).catch((err: any) => {
      this.message = {
        action: 'Approve failed',
        data: err.message
      };
    });
  }

  async sell(token_id: any) {

    token_id = Number(token_id).toString()

    //TODO
    await this.market_contract.addListing(token_id, '10000000000000000000')
      .then((result: any) => {
        this.message = {
          action: 'List successfully',
          data: result.hash
        }
        this.list_nft.splice(this.list_nft.findIndex(x => x == token_id), 1)
        this.nftCount--
      }).catch((err: any) => {
        this.message = {
          action: 'List failed',
          data: err.message
        };
      });
  }

  async hideToast() {
    this.message = {
      action: '',
      data: ''
    }
  }

}
