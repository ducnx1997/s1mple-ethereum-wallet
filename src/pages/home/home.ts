import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as Ethereum from 'ethers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  walletAddress: string;
  walletBalance: string;
  transactions: any;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.walletBalance = null;
    var wallet = new Ethereum.Wallet(localStorage.getItem('wallet'));
    this.walletAddress = wallet.address;
    wallet.provider = new Ethereum.providers.EtherscanProvider(localStorage.getItem('network'));
    wallet.getBalance().then((balance) => {
      this.walletBalance = Ethereum.utils.formatEther(balance);
    });
    this.transactions = [];
    wallet.provider.getHistory(this.walletAddress).then((history) => {
      console.log(history);
      this.transactions = history;
      this.transactions.forEach((transaction) => {
        transaction.value = Ethereum.utils.formatEther(transaction.value);
      });
    });
  }
}
