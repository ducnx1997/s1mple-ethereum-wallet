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
  txCount: string;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.walletBalance = null;
    this.txCount = null;
    var wallet = new Ethereum.Wallet(localStorage.getItem('wallet'));
    this.walletAddress = wallet.address;
    wallet.provider = Ethereum.providers.getDefaultProvider(localStorage.getItem('network'));
    wallet.getBalance().then((balance) => {
      this.walletBalance = Ethereum.utils.formatEther(balance);
    });
    wallet.getTransactionCount().then((txCount) => {
      this.txCount = txCount;
    });
  }
}
