import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import * as Ethereum from 'ethers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  walletAddress: string;
  walletBalance: string;
  txCount: string;
  transactions: any;

  constructor(public navCtrl: NavController, private http: HTTP) {
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

    this.transactions = [];

    this.http.get("http://api.etherscan.io/api?module=account&action=txlist&address=" 
    + this.walletAddress 
    + "&startblock=0&endblock=99999999&sort=desc&apikey=2S2PRGZE5QGAADAPVER2YHPNGK84Q28NBE",
    {}, {}).then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        this.transactions = JSON.parse(data.data).result;
        this.transactions.forEach(function(transaction) {
          let day = new Date(transaction.timeStamp * 1000);
          transaction.timeStamp = day.toUTCString();
        })
        console.log(this.transactions);
    });
  }
}
