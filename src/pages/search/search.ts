import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ProductService} from "../../providers/product-service";
import {CommonService} from "../../providers/common-service";



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              private barcodeScanner: BarcodeScanner ,public productService : ProductService ,
              public commonService : CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  scan()
  {
     this.barcodeScanner.scan().then((barcodeData) => {
        // Success! Barcode data is here
       if(!barcodeData.cancelled){
         this.barcodeHandling(barcodeData.text);
       }
      }, (err) => {
        // An error occurred
        console.log(err);
      });
  }
  barcodeHandling(barcode : string)
  {
    this.commonService.presentLoading('Please Wait ...');
    this.productService.productBarcode(barcode).subscribe((res)=>{
      if(res.ProductID)
      {
        this.navCtrl.push("DetailsPage",{
          ProductID : res.ProductID
        });
      }
      else
      {
        this.commonService.translateAndToast("The Barcode Does Not Exist");
      }
      this.commonService.dismissLoading();
    });
  }

}
