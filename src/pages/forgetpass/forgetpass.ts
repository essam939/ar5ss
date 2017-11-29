import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService, public commonService : CommonService,
              public translateService : TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }
  customerForgetPassword(email)
  {
    this.customerService.customerForgetPassword(email).subscribe((res)=>{
      if(res.Message)
      {
        this.commonService.presentToast(res.Message);
      }
      else
      {
        this.errorHandling();
      }
    });
  }
  errorHandling()
  {
    this.translateService.get('Error').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);

      }
    );
  }
gotoconfirm(){
  this.navCtrl.push("ConfirmPage");
}
}
