import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, IonicPage} from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {DomSanitizer} from "@angular/platform-browser";
import {CommonService} from "../../providers/common-service";

/**
 * Generated class for the SliderImagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-slider-image',
  templateUrl: 'slider-image.html',
})

export class SliderImagePage {
  public ProductID : number ;
  public ColorID : number ;
  public images : any[] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,private sanitizer: DomSanitizer ,
              public productService : ProductService , public viewCtrl : ViewController ,
              public commonService : CommonService) {
    this.ProductID = this.navParams.data.ProductID;
    this.ColorID = this.navParams.data.ColorID;
  }

  ionViewWillEnter()
  {
    this.commonService.presentLoading('Please Wait');
    this.productService.productColor(this.ProductID,this.ColorID).subscribe((res)=> {
      this.images = res ;
      this.commonService.dismissLoading();
      console.log(this.images);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderImagePage');
  }
  close()
  {
    this.viewCtrl.dismiss();
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
}
