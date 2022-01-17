import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { Message } from 'src/app/models/message';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  account: Account = {
    address: '',
    balance: ''
  }

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  token_contract: any;

  contracts_data: ContractData = new ContractData();

  constructor(private _contractService: ContractService, private _tokenService: TokenService) {
    this.setTokenContract();
  }

  ngOnInit(): void {
    this._tokenService.getAddress().then((account) => {
      this.account.address = account;
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


  getBalance() {

    this.token_contract.balanceOf(this.account.address).then((balance: any) => {
      let balanceFixed = Number(balance) / 1000000000000000000;

      this.account.balance = balanceFixed.toString()
    }).catch((err: any) => {
      this.message = {
        action: 'Fail',
        message: 'Get balance failed',
        data: err.message
      };
    });
  }

}