import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { contract_instanciate } from '../../models/contract_instanciate';
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


  contracts: contract_instanciate[] =
    [
      {
        contract_name: 'MarketNFT',
        contract_address: environment.MARKETPLACE_CONTRACT_ADDRESS,
        contract_abi: environment.MARKETPLACE_TOKEN_CONTRACT_JSON_PATH
      },
      {
        contract_name: 'LungoToken',
        contract_address: environment.LUNGO_TOKEN_CONTRACT_ADDRESS,
        contract_abi: environment.LUNGO_TOKEN_CONTRACT_JSON_PATH
      },

    ]

  constructor(private _contractService: ContractService) {
    this.setMarketContract();
    this.setTokenContract();

  }

  private async setMarketContract() {
    let contractMarket = this.contracts.find(x => x.contract_name == 'MarketNFT');

    if (contractMarket == undefined)
      return;

    this._contractService.getContract(contractMarket?.contract_abi, contractMarket?.contract_address).then(contract => {
      this.market_contract = contract;
    });
  }

  private async setTokenContract() {
    let contractToken = this.contracts.find(x => x.contract_name == 'LungoToken');

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

    let priceFixed = nft.price.toString()

    await this.token_contract.approve(environment.MARKETPLACE_CONTRACT_ADDRESS, priceFixed).then((result: any) => {
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