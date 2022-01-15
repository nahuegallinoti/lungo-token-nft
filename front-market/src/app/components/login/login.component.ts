import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Message } from 'src/app/models/message';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() walletIdEmitter = new EventEmitter<Account>();
  isLogin: boolean = false;

  constructor(private _tokenService: TokenService) {
  }

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  ngOnInit(): void {
  }

  connectionHandler() {
    if (this.isLogin) {
      this.isLogin = false;
      this.walletIdEmitter.emit({
        address: '',
        balance: ''
      });
    }

    else {
      this._tokenService.enableMetaMaskAccount()
        .then((account) => {
          this.isLogin = true;
          this.walletIdEmitter.emit({
            address: account[0],
            balance: ''
          });
        }, (err) => {
          this.message = {
            action: 'Fail',
            message: 'Login failed',
            data: err.message
          };
        })
    }
  }

}