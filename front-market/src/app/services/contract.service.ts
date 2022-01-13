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
export class ContractService {

  constructor() {
    this.loadWeb3();
  }

  private error_message: string = '';
  private web3: any;
  private signer: any;

  async getContract(contract_json_path: any, contract_address: any) {

    const response = await fetch(contract_json_path);
    const data = await response.json();

    if (this.web3 == null) {
      await this.loadWeb3();
    }

    const signer = this.web3.getSigner();

    let contract = new ethers.Contract(
      contract_address,
      data,
      signer,      
    );

    return contract
  }

  async loadWeb3() {
    return new Promise((resolve, reject) => {
      if (document.readyState == "complete") {
        if (typeof window.ethereum !== 'undefined') {
          this.web3 = new ethers.providers.Web3Provider(window.ethereum)
          this.signer = this.web3.getSigner()

          resolve([this.web3, this.signer])
        } else {
          reject("must install MetaMask")
          this.error_message = "Error: Please connect to Metamask";
        }
      } else {
        window.addEventListener("load", async () => {
          if (window.ethereum) {
            this.web3 = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.web3.getSigner()

            resolve([this.web3, this.signer])
          } else {
            reject("must install MetaMask")
            this.error_message = "Error: Please connect to Metamask";
          }
        });
      }
    });
  }
}