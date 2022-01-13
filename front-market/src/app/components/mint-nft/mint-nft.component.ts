import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-mint-nft',
  templateUrl: './mint-nft.component.html',
  styleUrls: ['./mint-nft.component.scss']
})
export class MintNftComponent implements OnInit {

  minting: boolean = false;
  txHash: string = '';

  nft_contract: any;
  NFT_CONTRACT_ADDRESS = "0x19C146C4f7F96f48659bb5CCDe2B7261b66f8846"
  NFT_CONTRACT_JSON_PATH = 'assets/contracts/json/LungoNFT.json';

  constructor(private _contractService: ContractService, private _tokenService: TokenService) {

    this._contractService.getContract(this.NFT_CONTRACT_JSON_PATH, this.NFT_CONTRACT_ADDRESS).then(contract => {
      this.nft_contract = contract;
    });
  }


  ngOnInit(): void {

  }

  async mint() {
    this.txHash = '';
    this.minting = true;

    await this.nft_contract.mint().then((result: any) => {
      this.txHash = result.hash;
    }).catch((err: any) => {
      console.log(err.message);
    });

    this.minting = false;
  }

  async hideToast() {
    this.txHash = '';
  }

}