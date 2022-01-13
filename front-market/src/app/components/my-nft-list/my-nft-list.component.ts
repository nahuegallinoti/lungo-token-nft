import { Component, OnInit } from '@angular/core';
import { contract_instanciate } from 'src/app/models/contract_instanciate';
import { nft_list } from 'src/app/models/nft_listed';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-nft-list',
  templateUrl: './my-nft-list.component.html',
  styleUrls: ['./my-nft-list.component.scss']
})
export class MyNftListComponent implements OnInit {

  constructor(private _contractService: ContractService, private _tokenService: TokenService) {
    this.setMarketContract();

  }

  contracts: contract_instanciate[] =
  [
    {
      contract_name: 'MarketNFT',
      contract_address: environment.MARKETPLACE_CONTRACT_ADDRESS,
      contract_abi: environment.MARKETPLACE_TOKEN_CONTRACT_JSON_PATH
    },

  ]

  my_nfts_listed: nft_list[] = []
  active_listing_count: number = -1
  market_contract: any;

  message = {
    action: '',
    data: ''
  }

  ngOnInit(): void {
  }

  private async setMarketContract() {
    let contractMarket = this.contracts.find(x => x.contract_name == 'MarketNFT');

    if (contractMarket == undefined)
      return;

    this._contractService.getContract(contractMarket?.contract_abi, contractMarket?.contract_address).then(contract => {
      this.market_contract = contract;
    });

  }

  async showList() {

    if (this.my_nfts_listed.length != 0 || this.active_listing_count != -1) {
      this.active_listing_count = -1;
      this.my_nfts_listed = [];
      return;
    }
    
    let address = await this._tokenService.getAddress();

    await this.market_contract.getListingsByOwnerCount(address).then((count: any) => {
      this.my_nfts_listed = [];
      this.active_listing_count = count

      for (let i = 0; i < count; i++) {
        this.market_contract.getListingsByOwner(address, i).then((listing_id: any) => {
          this.market_contract.listings(listing_id).then((listing: any) => {

            let nft: nft_list = {
              token_id: listing.token_id,
              price: Number(listing.price).toString(),
              list_id: listing_id
            }

            this.my_nfts_listed.push(nft)
          });
        });
      }

      
    });
  }


  async deslist(nft: nft_list) {

    let list_id = nft.list_id.toString()

    await this.market_contract.removeListing(list_id).then((result: any) => {
      this.message = {
        action: 'Deslist successfully',
        data: result.hash
      };

      this.my_nfts_listed.splice(this.my_nfts_listed.findIndex(x => x.token_id == x.token_id), 1)
      this.active_listing_count--

    }).catch((err: any) => {
      this.message = {
        action: 'Deslist failed',
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
