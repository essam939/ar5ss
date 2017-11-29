import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";

@IonicPage()
@Component({
  selector: 'page-complain',
  templateUrl: 'complain.html',
})
export class Complain {
  public complainTypes = [];
  public complain = {
    ComplainTypeId : null,
    Tittle : null ,
    Descriotion : null
  };
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public commonService : CommonService) {

  }

  ionViewWillEnter()
  {
    this.customerService.getComplainTypes().subscribe((res)=>{
      this.complainTypes = res;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Complain');
  }
  insertComplain()
  {
    this.customerService.insertComplain(
      this.customerService.customer.UserID,
      this.complain.ComplainTypeId,
      this.complain.Tittle ,
      this.complain.Descriotion
    ).subscribe((res)=>{
        if(res.ComplainId)
        {
          this.commonService.successToast();
          this.navCtrl.pop();
        }
        else
          this.commonService.errorToast();
    });
  }

}
