import { CommonService } from './../../providers/common-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public customerService:CustomerService,private nativeStorage: NativeStorage,public commonService:CommonService,private alertCtrl: AlertController, public translate : TranslateService) {
  this.presentAlert();
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
//this.commonService.translateAndToast('We received your order and will communicate with you soon');
  }
  GoHome(){
    this.navCtrl.setRoot("HomePage");
  }
presentAlert(){
   this.translate.get('We received your order and will communicate with you soon').subscribe(
      value => {
        // value is our translated string
        let alert = this.alertCtrl.create({
          subTitle: value,
          buttons: [
            {
              text: 'Ok',
            }
          ]
        });
        alert.present();
   })
}
}
