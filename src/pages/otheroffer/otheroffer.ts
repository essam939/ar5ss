import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {CustomerService} from "../../providers/customer-service";
import {MainService} from "../../providers/main-service";

@IonicPage()
@Component({
  selector: 'page-otheroffer',
  templateUrl: 'otheroffer.html',
})
export class OtherofferPage {

  public ProductID : number ;
  public relatedProduct : any[] ;

  public MainService : MainService =  MainService ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public commonService : CommonService , public customerService : CustomerService ) {
      this.ProductID = this.navParams.data.ProductID;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherofferPage');
  }
  ionViewWillEnter()
  {
    this.customerService.getRelatedProduct(this.ProductID).subscribe((res)=>{
        this.relatedProduct = res ;
    });
  }
  viewProduct(ProductID : number)
  {
    this.navCtrl.push("DetailsPage",{
      ProductID :ProductID
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }

}
