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
    this.walletAddress = localStorage.getItem('address');
    var provider = new Ethereum.providers.EtherscanProvider(localStorage.getItem('network'));
    provider.getBalance(this.walletAddress).then((balance) => {
      this.walletBalance = Ethereum.utils.formatEther(balance);
    });
    this.transactions = [];
    provider.getHistory(this.walletAddress).then((history) => {
      console.log(history);
      this.transactions = history.reverse();
      this.transactions.forEach((transaction) => {
        transaction.value = Ethereum.utils.formatEther(transaction.value);
      });
    });
  }
}
