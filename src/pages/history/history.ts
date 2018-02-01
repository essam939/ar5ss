import { ProductService } from './../../providers/product-service';
import { MainService } from './../../providers/main-service';
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
  public MainService = MainService;
  public vat : number = 0;
  constructor(public product : ProductService,public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService , public commonService :  CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  ionViewWillEnter()
  {  
    this.product.getVat().subscribe((res)=>{
      this.vat = res.value / 100;
    });
    this.customerService.orderHistory(CustomerService.RecentOrderCode).subscribe((res)=>{
      this.recentHistory = res ;
      console.log(this.recentHistory);
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
  calucateTota(total1){
     let total = parseInt(total1);
     let tot : number = 0;
     tot = total*this.vat;
     tot  = tot + total;
     return tot;
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
