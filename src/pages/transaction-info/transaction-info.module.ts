import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionInfoPage } from './transaction-info';

@NgModule({
  declarations: [
    TransactionInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionInfoPage),
  ],
})
export class TransactionInfoPageModule {}
