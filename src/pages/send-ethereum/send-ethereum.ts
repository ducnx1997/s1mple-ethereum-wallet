import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import * as Ethereum from 'ethers';

/**
 * Generated class for the SendEthereumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-ethereum',
  templateUrl: 'send-ethereum.html',
})
export class SendEthereumPage {
  receiver: string;
  amount: string;
  gasLimit: string;
  gasPrice: string;
  wallet: any;
  sending: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendEthereumPage');
  }

  sendEthereum() {
    var wallet = new Ethereum.Wallet(localStorage.getItem('wallet'));
    wallet.provider = Ethereum.providers.getDefaultProvider(localStorage.getItem('network'));
    var transaction = {
      gasLimit: Ethereum.utils.bigNumberify(this.gasLimit),
      gasPrice: Ethereum.utils.parseUnits(this.gasPrice, 'gwei'),
      to: this.receiver,
      value: Ethereum.utils.parseEther(this.amount)
    };
    this.sending = true;
    wallet.sendTransaction(transaction).then((tx) => {
      console.log(tx);
      this.sending = false;
      this.toastCtrl.create({
        message: 'Transaction sent! Hash: ' + tx.hash,
        duration: 3000,
        position: 'top'
      }).present();
    }, (error) => {
      console.log(error);
      this.toastCtrl.create({
        message: 'Error: ' + error.message,
        duration: 3000,
        position: 'top'
      }).present();
    });
  }
}
