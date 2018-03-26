import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

import * as Ethereum from 'ethers';

/**
 * Generated class for the InitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {
  walletPrivateKey: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitPage');
  }

  initializeWallet() {
    try {
      var wallet = new Ethereum.Wallet(this.walletPrivateKey);
      console.log(wallet);
      localStorage.setItem('wallet', this.walletPrivateKey);
      this.navCtrl.setRoot(HomePage);
    } catch (e) {
      console.log(e);
      this.toastCtrl.create({
        message: 'Error: ' + e.message,
        duration: 3000,
        position: 'top'
      }).present();
    }
  }
}
