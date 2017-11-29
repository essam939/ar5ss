import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, IonicPage} from 'ionic-angular';

/**
 * Generated class for the PaymentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  public paymentTypes : any[];
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public viewCtrl : ViewController) {
    this.paymentTypes = navParams.data ;
    console.log(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
  }
  close(PaymentID : number)
  {
    this.viewCtrl.dismiss({
      PaymentID : PaymentID
    });
  }
}
