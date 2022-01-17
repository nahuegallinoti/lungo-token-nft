import { Component, OnInit } from '@angular/core';
import { Nft_listed } from 'src/app/models/nft_listed';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.scss']
})
export class MyNftListComponent implements OnInit {

  constructor(private _contractService: ContractService, private _tokenService: TokenService) {
    this.setMarketContract();

  }

  contracts_data: ContractData = new ContractData();

  my_nfts_listed: Nft_listed[] = []
  active_listing_count: number = -1
  market_contract: any;

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  ngOnInit(): void {
  }

  private async setMarketContract() {
    let contractMarket = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

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

            let price = Number(listing.price).toString()

            let nft: Nft_listed = {
              token_id: listing.token_id,
              price: price.substring(0, price.length - 18),
              list_id: listing_id,
              // image: ''
            }

            this.my_nfts_listed.push(nft)
          });
        });
      }


    });
  }


  async deslist(nft: Nft_listed) {

    let list_id = nft.list_id.toString()

    await this.market_contract.removeListing(list_id).then((result: any) => {
      this.message = {
        action: 'Done',
        message: 'Deslist successfully',
        data: result.hash
      };

      this.my_nfts_listed.splice(this.my_nfts_listed.findIndex(x => x.token_id == x.token_id), 1)
      this.active_listing_count--

    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'Deslist failed',
        data: err.message
      };
    });
  }

}