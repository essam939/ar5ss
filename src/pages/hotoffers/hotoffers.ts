import {Component, ViewChildren} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {MainService} from "../../providers/main-service";


@IonicPage()
@Component({
  selector: 'page-hotoffers',
  templateUrl: 'hotoffers.html',
})
export class HotoffersPage {
  public hotOffer : any ;
  public wishList : any ;
  public cart : any[] = [] ;
  public MainService : MainService = MainService ;
  @ViewChildren('productsIcon') elRef;
  @ViewChildren('productsCartIcon') cartIconRef ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public productService : ProductService , public customerService : CustomerService ,
              public commonService : CommonService) {
  }
  ionViewWillEnter()
  {
    this.customerService.getWishList().subscribe((wishRes)=>{
      this.wishList = wishRes;
      this.customerService.getCart().subscribe((cartRes)=>{
        this.cart = cartRes;
        this.getHotOffer();
      });
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HotoffersPage');
  }
  checkProductInFav(ProductID : number)
  {
    return this.commonService.checkProductIsExistInFavorite(this.wishList , ProductID);
  }
  checkProductInCart(ProductID : number)
  {
    return this.commonService.checkProductIsExistInCart(this.cart , ProductID);
  }
  getHotOffer()
  {
    this.productService.hotOffer().subscribe((res)=>{
      this.hotOffer = res;
    });
  }
  addFav(ProductID : number , element : any ) {
    element.style.color = 'crimson';
    this.customerService.addToWishList(ProductID).subscribe((res) => {
      if (res == true)
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }
  removeFav(ProductID : number , element : any)
  {
    element.style.color = 'darkgrey';
    this.customerService.deleteFav(ProductID).subscribe((res)=>{
      if (res.state == '202')
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }


  addToWishList(ProductID : number)
  {
    let iconFilter :any ;
    iconFilter = this.elRef.toArray().filter((icon) => {
      return (icon.nativeElement.id == ProductID);
    });
    if(iconFilter[0].nativeElement.style.color == 'crimson')
      this.removeFav(ProductID , iconFilter[0].nativeElement);
    else
      this.addFav(ProductID , iconFilter[0].nativeElement);
  }
  addToCart(ProductID : number , SellerID : number)
  {
    let iconFilter :any ;
    iconFilter = this.cartIconRef.toArray().filter((icon) => {
      return (icon.nativeElement.id == ProductID);
    });
    if(this.commonService.splitFromLastBackSlash(iconFilter[0].nativeElement.src) == 'cart_on.png')
      this.removeCart(ProductID , iconFilter[0].nativeElement);
    else
      this.addCart(ProductID , SellerID ,iconFilter[0].nativeElement);
  }
  addCart(ProductID : number , SellerID : number ,element : any ) {
    element.src = 'assets/imgs/cart_on.png';
    this.customerService.addToCart(ProductID , SellerID).subscribe((res)=>{
      if(res == true)
        this.commonService.successToast();
      else if(res.error)
        this.commonService.translateAndToast(res.error);
      else
        this.commonService.errorToast();
    });
  }
  removeCart(ProductID : number , element : any)
  {
    element.src = 'assets/imgs/cart_off.png';
    this.customerService.delCart(ProductID).subscribe((res)=>{
      if(res.state == '202')
        this.commonService.successToast();
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
}
