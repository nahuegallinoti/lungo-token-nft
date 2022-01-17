import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Message } from 'src/app/models/message';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {
      linkId: 1,
      linkName: 'Mint NFT',
      linkUrl: 'mint-nft'

    },
    {
      linkId: 2,
      linkName: 'Market',
      linkUrl: 'market'

    },
    {
      linkId: 3,
      linkName: 'My NFTs',
      linkUrl: 'nft-data'
    },
    {
      linkId: 4,
      linkName: 'Listings',
      linkUrl: 'nft-list'

    },
    {
      linkId: 5,
      linkName: 'NFT Staked',
      linkUrl: 'nft-staked'
    },
  ]

  @Output() walletIdEmitter = new EventEmitter<Account>();
  isLogin: boolean = true;

  message: Message = {
    action: '',
    data: '',
    message: ''
  }

  account: any = null;

  constructor(private _tokenService: TokenService) {
  }

  ngOnInit(): void {
    this._tokenService.getAddress().then((account) => {
      if (account != null) {
        this.account = account;
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    });

  }

  async connectionHandler() {

    this._tokenService.enableMetaMaskAccount()
      .then((account) => {
        this.isLogin = true;
        this.account = account;

        this.walletIdEmitter.emit({
          address: account[0],
          balance: ''
        });
        window.location.reload()
      }, (err) => {
        this.message = {
          action: 'Fail',
          message: 'Login failed',
          data: err.message
        };
      })
  }
}