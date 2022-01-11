import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { TokenService } from '../services/token.service';

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
  
  constructor(private _tokenService: TokenService) { }

  ngOnInit(): void {
  }

  getBalance() {
    this._tokenService.getBalance(this.account.address).then((balance) => {
      this.account.balance = balance;
    }, (err) => { console.log(err) });
  }

}