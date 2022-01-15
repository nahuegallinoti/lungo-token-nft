import { Component, OnInit } from '@angular/core';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { Message } from 'src/app/models/message';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nft-staked',
  templateUrl: './nft-staked.component.html',
  styleUrls: ['./nft-staked.component.scss']
})
export class NftStakedComponent implements OnInit {

  constructor(private _tokenService: TokenService, private _contractService: ContractService) {
    this.setStakeContract();
  }

  contracts_data: ContractData = new ContractData();
  staking_contract: any;
  current_reward: any = 0;

  message: Message = {
    action: '',
    data: '',
    message: '',
  }

  my_nfts_staked: any[] = [];
  active_staking_count: number = -1;

  ngOnInit(): void {
  }

  private async setStakeContract() {
    let contractStake = this.contracts_data.contracts.find(x => x.contract_name == ContractName.STAKING_NFT);

    if (contractStake == undefined)
      return;

    this._contractService.getContract(contractStake?.contract_abi, contractStake?.contract_address).then(contract => {
      this.staking_contract = contract;
    });

  }

  async showStake() {

    if (this.my_nfts_staked.length != 0 || this.active_staking_count != -1) {
      this.active_staking_count = -1;
      this.my_nfts_staked = [];
      return;
    }

    let address = await this._tokenService.getAddress();

    await this.staking_contract.has_deposited(address).then((hasDeposit: boolean) => {

      if (!hasDeposit) {
        this.active_staking_count = 0;
        return;
      }

      this.staking_contract.deposited_tokens(address).then((nft_id: any) => {
        let token_id = Number(nft_id).toString()
        this.active_staking_count = 1
        this.my_nfts_staked.push(token_id)
      });

      
      this.staking_contract.calculateReward(address).then((reward: any) => {
        let rewardFixed = Number(reward) / 1000000000000000000
        this.current_reward = rewardFixed
      });
    });


  }


  async unstake(token_id: any) {

    await this.staking_contract.withdraw().then((result: any) => {
      this.message = {
        action: 'Done',
        message: 'Unstake successfully. Tokens were sent to your wallet',
        data: result.hash
      };

      this.current_reward = 0
      this.my_nfts_staked.splice(this.my_nfts_staked.findIndex(x => x == x), 1)
      this.active_staking_count--

    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'Unstake failed',
        data: err.message
      };
    });
  }
}