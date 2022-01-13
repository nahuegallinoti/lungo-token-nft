import { Component, OnInit } from '@angular/core';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { environment } from 'src/environments/environment';
import { nft_list } from '../../models/nft_listed';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})


export class MarketComponent implements OnInit {

  ngOnInit(): void {
  }

  //actives listing count
  active_listing_count: number = -1;
  nft_listed: nft_list[] = [];
  market_contract: any;
  token_contract: any;

  message = {
    action: '',
    data: ''
  }

  contracts_data: ContractData = new ContractData();


  constructor(private _contractService: ContractService) {
    this.setMarketContract();
    this.setTokenContract();

  }

  private async setMarketContract() {
    let contractMarket = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    if (contractMarket == undefined)
      return;

    this._contractService.getContract(contractMarket?.contract_abi, contractMarket?.contract_address).then(contract => {
      this.market_contract = contract;
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


  async showMarket() {

    if (this.nft_listed.length != 0 || this.active_listing_count != -1) {
      this.active_listing_count = -1;
      this.nft_listed = [];
      return;
    }

    await this.market_contract.getActiveListingsCount().then((count: any) => {
      this.nft_listed = [];
      this.active_listing_count = count

      for (let i = 0; i < count; i++) {
        this.market_contract.getActiveListings(i).then((listing_id: any) => {
          this.market_contract.listings(listing_id).then((listing: any) => {

            let nft: nft_list = {
              token_id: listing.token_id,
              price: Number(listing.price).toString(),
              list_id: listing_id
            }

            this.nft_listed.push(nft)
          });
        });
      }

      
    });
  }

  async approveBuy(nft: nft_list) {

    let market_contract = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    let priceFixed = nft.price.toString()

    await this.token_contract.approve(market_contract?.contract_address, priceFixed).then((result: any) => {
      this.message = {
        action: 'Buy Approve successfully',
        data: result.hash
      };
    }).catch((err: any) => {
      this.message = {
        action: 'Buy Approve failed',
        data: err.message
      };
    });

  }

  async buy(nft: nft_list) {

    let list_id = nft.list_id.toString()

    await this.market_contract.buy(list_id).then((result: any) => {
      this.message = {
        action: 'Buy successfully',
        data: result.hash
      };

      this.nft_listed.splice(this.nft_listed.findIndex(x => x.token_id == x.token_id), 1)
      this.active_listing_count--

    }).catch((err: any) => {
      this.message = {
        action: 'Buy failed',
        data: err.data.message
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