import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { contract_instanciate } from 'src/app/models/contract_instanciate';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

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

  contracts: contract_instanciate[] =
    [
      {
        contract_name: 'LungoToken',
        contract_address: environment.LUNGO_TOKEN_CONTRACT_ADDRESS,
        contract_abi: environment.LUNGO_TOKEN_CONTRACT_JSON_PATH
      },
    ]

  constructor(private _tokenService: TokenService, private _contractService: ContractService) {
    this.setTokenContract();
  }

  ngOnInit(): void {
  }

  private async setTokenContract() {
    let contractToken = this.contracts.find(x => x.contract_name == 'LungoToken');

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