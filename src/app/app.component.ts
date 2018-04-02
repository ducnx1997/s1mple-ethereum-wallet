import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SendEthereumPage } from '../pages/send-ethereum/send-ethereum';
import { InitPage } from '../pages/init/init';
import { PriceChartPage } from '../pages/price-chart/price-chart';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Send Ethereum', component: SendEthereumPage },
      { title: 'Price chart', component: PriceChartPage },
      { title: 'Logout', component: InitPage }
    ];

    if (!this.walletInitialized()) {
      this.rootPage = InitPage;
    } else {
      this.rootPage = HomePage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  walletInitialized(): boolean {
    return localStorage.getItem('wallet') != null;
  }
}
