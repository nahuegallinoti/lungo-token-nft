import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { ContractData, ContractName } from 'src/app/models/enum-contracts';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  @Input() account: Account = {
    address: '',
    balance: ''
  }

  token_contract: any;

  contracts_data: ContractData = new ContractData();

  constructor(private _contractService: ContractService) {
    this.setTokenContract();
  }

  ngOnInit(): void {
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
      this.account.balance = balance
    }).catch((err: any) => {
      console.log(err.message);
    });
  }

}