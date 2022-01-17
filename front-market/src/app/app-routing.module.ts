import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDataComponent } from './components/account-data/account-data.component';
import { MarketComponent } from './components/market/market.component';
import { MintNftComponent } from './components/mint-nft/mint-nft.component';
import { NftDataComponent } from './components/nft-data/nft-data.component';
import { MyNftListComponent } from './components/nft-listed/nft-list.component';
import { NftStakedComponent } from './components/nft-staked/nft-staked.component';

const routes: Routes = [
  {
    path: 'home',
    component: AccountDataComponent
  },
  {
    path: 'nft-data',
    component: NftDataComponent
  },
  {
    path: 'market',
    component: MarketComponent
  },
  {
    path: 'nft-list',
    component: MyNftListComponent
  },
  {
    path: 'mint-nft',
    component: MintNftComponent
  },
  {
    path: 'nft-staked',
    component: NftStakedComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
