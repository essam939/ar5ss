import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
  public contactInfo = {
    Email : null ,
    Title : null ,
    Body : null
  };
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public commonService : CommonService)
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contact');
  }
  contact()
  {
    this.customerService.contact(
      this.contactInfo.Email ,
      this.contactInfo.Title ,
      this.contactInfo.Body
    ).subscribe((res)=>{
      if(res.stuts == "true")
      {
        this.commonService.successToast();
        this.navCtrl.pop();
      }
      else
        this.commonService.errorToast();
    });
  }
}
