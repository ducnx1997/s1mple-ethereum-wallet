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
  loginData: string;
  method: string;
  network: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitPage');
    this.method = 'private';
    this.network = 'homestead';
    localStorage.removeItem('wallet');
    localStorage.removeItem('network');
  }

  initializeWallet() {
    try {
      if (this.method === 'private') {
        new Ethereum.Wallet(this.loginData);
        localStorage.setItem('wallet', this.loginData);
      } else if (this.method === 'mnemonic') {
        var wallet = Ethereum.Wallet.fromMnemonic(this.loginData);
        localStorage.setItem('wallet', wallet.privateKey);
      }

      localStorage.setItem('network', this.network);
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
