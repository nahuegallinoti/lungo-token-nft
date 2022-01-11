import { Component, OnInit } from '@angular/core';
import { Account } from './models/account';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  account: Account = {
    address: '',
    balance: ''
  };

  constructor(private _tokenService: TokenService) {
  }

  ngOnInit() {
  }

  updateWallet(wallet: Account) {
    this.account = wallet;

  }

  signTransaction() {
    this._tokenService.signTransaction();
  }
}