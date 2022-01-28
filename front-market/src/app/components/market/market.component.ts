import { Component, OnInit } from '@angular/core';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { TokenService } from 'src/app/services/token.service';
import { Nft_listed } from '../../models/nft_listed';
import { Message } from '../../models/message';
import { ContractService } from '../../services/contract.service';
import { NftService } from 'src/app/services/nft.service';

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
  nft_listed: Nft_listed[] = [];
  market_contract: any;
  token_contract: any;

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  contracts_data: ContractData = new ContractData();


  constructor(private _contractService: ContractService, private _tokenService: TokenService, private _nftService: NftService) {
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

            let price = Number(listing.price).toString()
            this._nftService.getNFTImageById(listing_id).then((image: any) => {

            let nft: Nft_listed = {
              token_id: listing.token_id,
              price: price.substring(0, price.length - 18),
              list_id: listing_id,
              image: image
            }

            this.nft_listed.push(nft)
          });
        });
        });
      }


    });
  }

  async approveBuy(nft: Nft_listed) {

    let market_contract = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    let priceFixed = nft.price.toString() + '000000000000000000'

    await this.token_contract.approve(market_contract?.contract_address, priceFixed).then((result: any) => {
      this.message = {
        action: 'Done',
        message: 'Buy approve successfully',
        data: result.hash
      };
    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'Buy approve failed',
        data: err.data.message
      };
    });

  }

  async buy(nft: Nft_listed) {

    let account = await this._tokenService.getAddress();
    let market_contract = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    let allowance = await this.token_contract.allowance(account, market_contract?.contract_address)

    allowance = allowance.toString()

    let list_id = nft.list_id.toString()
    let priceFixed = nft.price.toString() + '000000000000000000'

    if (allowance >= priceFixed) {

      await this.market_contract.buy(list_id).then((result: any) => {
        this.message = {
          action: 'Done',
          message: 'Buy successfully',
          data: result.hash
        };

        this.nft_listed.splice(this.nft_listed.findIndex(x => x.token_id == x.token_id), 1)
        this.active_listing_count--

      }).catch((err: any) => {
        this.message = {
          action: 'Fail',
          message: 'Buy failed',
          data: err.data.message
        };
      });
    }

    else {
      this.message = {
        action: 'Fail',
        message: 'Buy failed',
        data: 'Allowance is not enough'
      };

    }
  }

}