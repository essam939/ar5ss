import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {MainService} from "../../providers/main-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "../../providers/common-service";
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  public MainService : MainService = MainService ;
  public wishList : any[] = [] ;
  public cart : any[] = [] ;
  public toggleStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public platform : Platform ,
              private translate: TranslateService , public commonService :  CommonService,public nativeStorage:NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }
  ionViewWillEnter()
  {
    this.customerService.getCart().subscribe((res : any[])=>{
      this.cart = res ;
    });
    this.customerService.getWishList().subscribe((res : any[])=>{
      this.wishList = res ;
    });
  }
 gotocomplain(){
   if(this.customerService.customer != null)
    this.navCtrl.push("Complain");
   else this.commonService.translateAndToast('You Have To Login First');
 }
 gotocontact(){
   this.navCtrl.push("Contact");
 }
 gotoAbout()
 {
   this.navCtrl.push("AboutPage");
 }
 Change_Toggle(type) {

  this.translate.setDefaultLang(type);
  this.nativeStorage.setItem('lang',type);
  MainService.lang = type;
  if(type == 'ar'){
    this.platform.setDir('rtl', true);
  console.log(type);
  console.log("arabic");
  this.navCtrl.setRoot("HomePage");
  }
  else
  {
    this.platform.setDir('ltr', true);
    console.log(type);
    console.log("English");
     this.navCtrl.setRoot("HomePage");
  }
}
  goToFav()
  {
    this.navCtrl.push("WishlistPage");
  }
  goToCart()
  {
    this.navCtrl.push("ShoppingcartsPage");
  }


}
