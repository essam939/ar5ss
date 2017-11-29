import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {DbService} from "../../providers/db-service";
import {MainService} from "../../providers/main-service";

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  public wishList : any[] = [] ;
  public cart : any[] = [] ;
  public cartNo : number = 0 ;
  public MainService : MainService = MainService ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService: CustomerService , public commonService : CommonService ) {
  }


  ionViewWillEnter()
  {
    this.customerService.getCart().subscribe((res : any[])=>{
     this.cart = res ;
     this.cartNo = res.length ;
    });
    this.getWishList();
  }
  getWishList(){
     this.customerService.getWishList().subscribe((res)=>{
        this.wishList = res ;
        console.log(this.wishList);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }
  deleteWishlist(favoritID : number)
  {
    if(!this.customerService.online){
      this.commonService.translateAndToast("Offline Mode Now , Go Home");
      return ;
    }
    this.customerService.deleteWishlist(favoritID).subscribe((res)=>{
      if(res.stats == 'done')
      {
        this.commonService.successToast();
        this.getWishList();
      }
      else
        this.commonService.errorToast();

    });
  }
  addToCart(ProductID : number , SellerID : number,element : any, productObj ?: any )
  {
    if(this.commonService.splitFromLastBackSlash(element.src) == 'cart_on.png')
      this.removeCart(ProductID , element);
    else
      this.addCart(ProductID , SellerID ,element,productObj);
  }
  addCart(ProductID : number , SellerID : number ,element : any , productObj ?: any  ) {
    element.src = 'assets/imgs/cart_on.png';
    if(!this.customerService.online){
      this.commonService.translateAndToast("Offline Mode Now , Go Home");
      return ;
      //this.cartNo++;

    } // update in later
    this.customerService.addToCart(ProductID ,SellerID ,productObj.product_name,productObj.Image,productObj.ProductPrice).subscribe((res)=>{
      if(res == true)
      {
        this.cartNo++;
        this.commonService.successToast();
      }
      else if(res.error)
        this.commonService.translateAndToast(res.error);
      else
        this.commonService.errorToast();
    });
  }
  removeCart(ProductID : number , element : any)
  {
    element.src = 'assets/imgs/cart_on.png';
    if(!this.customerService.online){
      this.commonService.translateAndToast("Offline Mode Now , Go Home");
      return ;
    }
    element.src = 'assets/imgs/cart_off.png';
    this.customerService.delCart(ProductID).subscribe((res)=>{
      if(res.state == '202')
      {
        this.cartNo--;
        this.commonService.successToast();
      }
      else
        this.commonService.errorToast();
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
  goToFav()
  {
    this.navCtrl.push("WishlistPage");
  }
  goToCart()
  {
    this.navCtrl.push("ShoppingcartsPage");
  }
}
