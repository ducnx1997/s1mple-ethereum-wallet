import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

import * as Ethereum from 'ethers';
import * as CryptoJS from 'crypto-js';

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
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitPage');
    this.method = 'private';
    this.network = 'homestead';
    localStorage.removeItem('wallet');
    localStorage.removeItem('network');
  }

  initializeWallet() {
    var alert = this.alertCtrl.create({
      title: 'Set password',
      subTitle: 'Password must be at least 6 characters long',
      inputs: [
        {
          name: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'OK',
          handler: data => {
            if (data.password.length < 6) {
              this.toastCtrl.create({
                message: 'Password is too short!',
                duration: 3000,
                position: 'top'
              }).present();

              return false;
            }

            try {
              var wallet;
        
              if (this.method === 'private') {
                wallet = new Ethereum.Wallet(this.loginData);
              } else if (this.method === 'mnemonic') {
                wallet = Ethereum.Wallet.fromMnemonic(this.loginData);
              }
        
              localStorage.setItem('wallet', CryptoJS.AES.encrypt(wallet.privateKey, data.password).toString());
              localStorage.setItem('address', wallet.address);
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
      ]
    });

    alert.present();
  }
}
