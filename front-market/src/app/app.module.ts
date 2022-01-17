import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountDataComponent } from './components/account-data/account-data.component';
import { MintNftComponent } from './components/mint-nft/mint-nft.component';
import { NftDataComponent } from './components/nft-data/nft-data.component';
import { MarketComponent } from './components/market/market.component';
import { MyNftListComponent } from './components/nft-listed/nft-list.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { NftStakedComponent } from './components/nft-staked/nft-staked.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountDataComponent,
    MintNftComponent,
    NftDataComponent,
    MarketComponent,
    MyNftListComponent,
    ToastComponent,
    NftStakedComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
