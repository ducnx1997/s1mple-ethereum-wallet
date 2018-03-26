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
    var wallet = new Ethereum.Wallet(localStorage.getItem('wallet'));
    this.walletAddress = wallet.address;
    wallet.provider = Ethereum.providers.getDefaultProvider();
    wallet.getBalance().then((balance) => {
      this.walletBalance = Ethereum.utils.formatEther(balance);
    });
    wallet.getTransactionCount().then((txCount) => {
      this.txCount = txCount;
    });
  }
}
