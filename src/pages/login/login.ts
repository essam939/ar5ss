import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public customer ;
  public pwShown = 0;
  public eyeicon : string = 'eye';
  public passtype : any = 'password';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService: CustomerService , public commonService:CommonService ,
              public translateService  : TranslateService) {
    this.customer = {'':''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  customerLogin()
  {console.log(this.customer.Email , this.customer.Password);

    this.commonService.presentToast(this.customer.Email)
    this.customerService.customerLogin(this.customer.Email,this.customer.Password).subscribe((res)=>{

      if(res.Error)
      {
        this.commonService.presentToast(res.Error);
      }
      else
      {
        this.successlogin(res);
      }
    },e=>{
      console.log(e)
    });
  }
  successlogin(customer)
  {
    this.customerService.customer = customer; // temparay has to be deleted
    this.customerService.customerStorageSave(customer);
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);
      }
    );
    this.navCtrl.push("HomePage");
  }
 gotoforget(){
   this.navCtrl.push("ForgetpassPage");
 }
 gotosignup(){
   this.navCtrl.push("SignupPage");
 }
 gohome(){
   this.navCtrl.push("HomePage");
 }
 


showHide(){
  let self = this;
  document.getElementById("eye").addEventListener("click", function () {
    if (self.pwShown == 0) {
       
        self.passtype = 'text';
        self.eyeicon = 'eye-off';
        self.pwShown = 1;
    } else {
       
        self.passtype = 'password';
        self.eyeicon = 'eye' ;
        self.pwShown = 0;
    }
  }, false);
}

}
