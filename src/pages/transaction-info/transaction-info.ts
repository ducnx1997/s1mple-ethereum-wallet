import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Ethereum from 'ethers';

/**
 * Generated class for the TransactionInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-info',
  templateUrl: 'transaction-info.html',
})
export class TransactionInfoPage {
  transaction: any;
  gasPrice: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.transaction = this.navParams.data.transaction;
    this.gasPrice = Ethereum.utils.formatUnits(this.transaction.gasPrice, 'gwei');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionInfoPage');
  }

}
