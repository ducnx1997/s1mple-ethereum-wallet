import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Chart } from 'chart.js';

/**
 * Generated class for the PriceChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-price-chart',
  templateUrl: 'price-chart.html',
})
export class PriceChartPage {
  @ViewChild('lineCanvas') lineCanvas;

  price: Object = { 'USD': null, 'BTC': null, 'EUR': null};
  lineChart: any;
  historicalPrice: any;
  historicalTs: any;
  data: any;
  highestPrice: any;
  lowestPrice: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceChartPage');
    this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC,EUR", {}, {})
      .then(data => {
        // console.log(data.status);
        // console.log(data.data); // data received by server
        // console.log(data.headers);
        this.price = JSON.parse(data.data);
      });

    this.historicalPrice = [];
    this.historicalTs = [];
    this.data = [];

    this.http.get("https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=14", {}, {})
      .then(data => {
        // console.log(data.status);
        // console.log(data.data); // data received by server
        // console.log(data.headers);
        this.data = JSON.parse(data.data)["Data"];
        this.historicalPrice = this.data.map(a => a.close);
        this.historicalTs = this.data.map(a => (new Date(a.time * 1000).getDate()));
        this.highestPrice = Math.max(...this.data.map(a => parseFloat(a.high)));
        this.lowestPrice = Math.min(...this.data.map(a => parseFloat(a.low)));
        console.log(this.historicalPrice);
        console.log(this.historicalTs);
        console.log(this.highestPrice);
        console.log(this.lowestPrice);
        console.log(this.data.map(a => a.high));

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              labels: this.historicalTs,
              datasets: [
                  {
                      label: "Last two weeks (USD)",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.historicalPrice,
                      spanGaps: true,
                  }
              ]
          }
    
        });
      });
  }

}
