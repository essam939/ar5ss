import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the LogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {
 product:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public customerService:CustomerService,private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPage');
  }
  ionViewWillEnter()
  {
    // this.customerService.getCart().subscribe((res)=>{
    //   console.log(res);    
    //   this.product=res;
    // });
    this.nativeStorage.getItem('cartlog').then((res)=>{
      this.product=res;
    });
  }
  GoHome(){
    this.navCtrl.push("HomePage");
  }
}
