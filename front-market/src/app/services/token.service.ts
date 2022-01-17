import { Injectable } from '@angular/core';
import { BigNumber, ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private web3: any;
  private signer: any;
  
  constructor() {
    if (typeof window.ethereum !== 'undefined') {

      this.web3 = new ethers.providers.Web3Provider(window.ethereum)
      this.signer = this.web3.getSigner()
    }
    else {
      alert("Please install MetaMask to use this app");
    }

  }

  ngOnInit(): void {
  }

  async enableMetaMaskAccount(): Promise<any> {
    return await this.web3.send("eth_requestAccounts", []);    
  }

  async getAddress(): Promise<any> {
    return await this.web3.provider.selectedAddress;    
  }

  async getBalance(account: string): Promise<any> {
    return ethers.utils.formatEther(await this.web3.getBalance(account));
  }

  async getCurrentBlock(): Promise<any> {
    return await this.web3.getBlockNumber();
  }

  async signTransaction(message: string): Promise<void> {
    return await this.signer.signMessage(message);
  }

}