import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { Message } from 'src/app/models/message';
import { NftService } from 'src/app/services/nft.service';

export interface NFT {
  id: number;
  price: string;
  image: string;
}

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
  list_nft: NFT[] = [];

  nft_contract: any;
  token_contract: any;
  market_contract: any;
  stake_nft_contract: any;

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  constructor(private _contractService: ContractService, private _tokenService: TokenService, private _nftService: NftService) {

    this.setNFTContract();
    this.setTokenContract();
    this.setMarketContract();
    this.setStakeContract();
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

  private async setStakeContract() {
    let stakeNFT = this.contracts_data.contracts.find(x => x.contract_name == ContractName.STAKING_NFT);

    if (stakeNFT == undefined)
      return;

    this._contractService.getContract(stakeNFT?.contract_abi, stakeNFT?.contract_address).then(contract => {
      this.stake_nft_contract = contract;
    });
  }

  private async countNFT() {
    this.nftCount = -1;

    let account = await this._tokenService.getAddress();

    await this.nft_contract.balanceOf(account).then((result: any) => {
      this.nftCount = result;
    }).catch((err: any) => {
      console.log(err.message);
    });

  }

  async showNFTs() {

    if (this.list_nft.length != 0) {
      this.list_nft = [];
      this.nftCount = -1;
      return;
    }

    await this.countNFT();

    if (this.nftCount == -1)
      return;

    let result: any[] = [];

    let account = await this._tokenService.getAddress();

    for (let i = 0; i < this.nftCount; i++) {

      await this.nft_contract.tokenOfOwnerByIndex(account, i).then((token: any) => {

        let nft: NFT = {
          id: token,
          price: '',
          image: ''
        }
        result.push(nft);
      }).catch((err: any) => {
        alert(err.message);
      });
    }

    this.list_nft = result.sort((a, b) => {
      return a - b;
    })

    this._nftService.getNFTImage(this.list_nft).then((result) => {
      this.list_nft = result;
    });

  }

  async approveSell(nft: NFT) {

    let market_contract = this.contracts_data.contracts.find(x => x.contract_name == ContractName.MARKET_NFT);

    let token_id = Number(nft.id).toString()

    await this.nft_contract.approve(market_contract?.contract_address, token_id).then((result: any) => {
      this.message = {
        action: 'Done',
        message: 'Approve successfully',
        data: result.hash
      };
    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'Approve failed',
        data: err.message
      };
    });
  }

  async sell(nft: NFT) {

    nft.id = Number(nft.id)
    let price = Number(nft.price).toString() + '000000000000000000'

    let isApproved = await this.nft_contract.getApproved(nft.id)

    if (isApproved == this.market_contract.address) {


      await this.market_contract.addListing(nft.id, price)

        .then((result: any) => {
          this.message = {
            action: 'Done',
            message: 'List successfully',
            data: result.hash
          };
          this.list_nft.splice(this.list_nft.findIndex(x => x.id == nft.id), 1)
          this.nftCount--
        }).catch((err: any) => {
          this.message = {
            action: 'Fail',
            message: 'List failed',
            data: err.message
          };
        });
    }

    else {
      this.message = {
        action: 'Fail',
        message: 'List failed',
        data: 'You must approve this token before listing'
      };
    }
  }

  async approveStake(nft: NFT) {

    let stake_contract = this.contracts_data.contracts.find(x => x.contract_name == ContractName.STAKING_NFT);

    let token_id = Number(nft.id).toString()

    await this.nft_contract.approve(stake_contract?.contract_address, token_id).then((result: any) => {
      this.message = {
        action: 'Done',
        message: 'Approve successfully',
        data: result.hash
      };
    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'Approve failed',
        data: err.message
      };
    });
  }

  async stake(nft: NFT) {

    nft.id = Number(nft.id)

    let isApproved = await this.nft_contract.getApproved(nft.id)

    if (isApproved == this.stake_nft_contract.address) {


      await this.stake_nft_contract.deposit(nft.id)

        .then((result: any) => {
          this.message = {
            action: 'Done',
            message: 'Stake successfully',
            data: result.hash
          };
          this.list_nft.splice(this.list_nft.findIndex(x => x.id == nft.id), 1)
          this.nftCount--
        }).catch((err: any) => {
          this.message = {
            action: 'Fail',
            message: 'Stake failed',
            data: err.data.message
          };
        });
    }

    else {
      this.message = {
        action: 'Fail',
        message: 'Stake failed',
        data: 'You must approve this token before stake'
      };
    }
  }


}
