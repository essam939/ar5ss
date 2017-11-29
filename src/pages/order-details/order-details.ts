import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {CustomerService} from "../../providers/customer-service";

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  orderDetails : any[] = null;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public commonService : CommonService , public customerService : CustomerService) {
    this.orderDetails = this.navParams.data.order.order_details ;
    console.log(this.orderDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
  customerRate(OrderID : number ,ProductID : number, Rate : number )
  {
    this.customerService.customerRate(OrderID , ProductID , Rate).subscribe((res)=>{
      if(res.state == '202')
        this.commonService.successToast();
      else if(res.Error == 'You Are Rated This Product Before')
        this.commonService.translateAndToast('You Are Rated This Product Before');
    });
  }
}
