import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEthereumPage } from './send-ethereum';

@NgModule({
  declarations: [
    SendEthereumPage,
  ],
  imports: [
    IonicPageModule.forChild(SendEthereumPage),
  ],
})
export class SendEthereumPageModule {}
