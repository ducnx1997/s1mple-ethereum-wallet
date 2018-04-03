import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { HTTP } from '@ionic-native/http';

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
    });

    // this.http.get("http://api.etherscan.io/api?module=account&action=txlist&address=" 
    // + this.walletAddress 
    // + "&startblock=0&endblock=99999999&sort=desc&apikey=2S2PRGZE5QGAADAPVER2YHPNGK84Q28NBE",
    // {}, {}).then(data => {
    //     console.log(data.status);
    //     console.log(data.data); // data received by server
    //     this.transactions = JSON.parse(data.data).result;
    //     this.transactions.forEach(function(transaction) {
    //       let day = new Date(transaction.timeStamp * 1000);
    //       transaction.timeStamp = day.toUTCString();
    //     })
    //     console.log(this.transactions);
    // });
  }
}
