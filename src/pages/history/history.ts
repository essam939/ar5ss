import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public recentHistory : any [] = [];
  public lastHistory : any [] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService , public commonService :  CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  ionViewWillEnter()
  {
    this.customerService.orderHistory(CustomerService.RecentOrderCode).subscribe((res)=>{
      this.recentHistory = res ;
    });
    this.customerService.orderHistory(CustomerService.LastOrderCode).subscribe((res)=>{
      this.lastHistory = res ;
    });
  }
  handleMonth(date : string)
  {
    let str = date;
    let res = str.split("th ");
    return res[1];
  }
  handleDay(date : string)
  {
    let str = date;
    let res = str.split("th ");
    return res[0];
  }
  orderDetails(order : any)
  {
    this.navCtrl.push("OrderDetailsPage",{
      order : order
    });
  }
  goToHome()
  {
    this.navCtrl.push("HomePage");
  }

}
