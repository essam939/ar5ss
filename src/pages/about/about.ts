import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  public aboutInfo : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  ionViewWillEnter()
  {
    this.customerService.about().subscribe((res)=>{
      this.aboutInfo = res ;
    });
  }

}
