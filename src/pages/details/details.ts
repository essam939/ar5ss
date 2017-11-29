import {Component, ViewChildren} from '@angular/core';
import {NavController, NavParams, ModalController, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {ProductService} from "../../providers/product-service";
import {CommonService} from "../../providers/common-service";
import {MainService} from "../../providers/main-service";
import {SocialSharing} from "@ionic-native/social-sharing";


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public ProductID : number ;
  public productDetails : any ;
  public productProperty : any ;
  public wishList : any ;
  public cart : any[] = [] ;
  public MainService : MainService = MainService ;
  @ViewChildren('fav') fav;
  @ViewChildren('cartImg') cartImg;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public productService: ProductService ,
              public commonService : CommonService , public modalCtrl: ModalController ,
              public sharing: SocialSharing) {
    this.ProductID = this.navParams.data.ProductID ;
  }

  ionViewWillEnter()
  {
    this.productService.productDetails(this.ProductID).subscribe((res)=>{
      this.productDetails = res ;
      console.log(res);
    });
    this.productService.getProductProperty(this.ProductID).subscribe((res)=>{
      this.productProperty = res ;
      console.log(res);
    });
    this.customerService.getWishList().subscribe((res)=>{
      this.wishList = res;
      if(this.checkProductInFav(this.ProductID))
        this.fav._results[0].nativeElement.style.color = 'crimson' ;
    });
    this.customerService.getCart().subscribe((res)=>{
      this.cart = res;
      if(this.checkProductInCart(this.ProductID))
        this.cartImg._results[0].nativeElement.src = 'assets/imgs/cart_on.png' ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  checkProductInFav(ProductID : number)
  {
    return this.commonService.checkProductIsExistInFavorite(this.wishList , ProductID);
  }
  checkProductInCart(ProductID : number)
  {
    return this.commonService.checkProductIsExistInCart(this.cart , ProductID);
  }
  otherOffer(){
      this.navCtrl.push("OtherofferPage",{
        ProductID : this.ProductID
      });
    }

  addToWishList(ProductID : number)
  {
    if(this.fav._results[0].nativeElement.style.color == 'crimson')
      this.removeFav(ProductID , this.fav._results[0].nativeElement);
    else
      this.addFav(ProductID , this.fav._results[0].nativeElement);
  }
  addFav(ProductID : number , element : any ) {
    element.style.color = 'crimson';
    this.customerService.addToWishList(ProductID).subscribe((res) => {
      if (res == true) {
        this.commonService.successToast();
      }
      else
        this.commonService.errorToast();
    });
  }
  removeFav(ProductID : number , element : any)
  {
    element.style.color = 'darkgrey';
    this.customerService.deleteFav(ProductID).subscribe((res)=>{
      if (res.state == '202') {
        this.commonService.successToast();
      }
      else
        this.commonService.errorToast();
    });
  }
  addToCart(ProductID : number , SellerID : number)
  {
    if(this.commonService.splitFromLastBackSlash(this.cartImg._results[0].nativeElement.src) == 'cart_on.png')
      this.removeCart(ProductID , this.cartImg._results[0].nativeElement);
    else
      this.addCart(ProductID , SellerID ,this.cartImg._results[0].nativeElement);
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
  goToSliderImage(ColorID : number)
  {
    let modal = this.modalCtrl.create("SliderImagePage",{
      ProductID : this.ProductID ,
      ColorID : ColorID
    });
    modal.present();
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
  sharefb(){
    this.sharing.shareViaFacebook(this.productDetails.product_name,
      this.productDetails.product_color[0].product_image[0].Image )
      .then(()=>{
        this.commonService.successToast();
      }).catch((error)=>{
        this.commonService.errorToast();
    });
  }
  sharetwitter(){
    this.sharing.shareViaTwitter(null,
      this.productDetails.product_color[0].product_image[0].Image,
      null )
      .then(()=>{
        this.commonService.successToast();
      }).catch((error)=>{
      this.commonService.errorToast();
    });
  }
  sharetwhatsapp(){
    this.sharing.shareViaWhatsApp(null,
      this.productDetails.product_color[0].product_image[0].Image ,
    null)
      .then(()=>{
        this.commonService.successToast();
      }).catch((error)=>{
      this.commonService.errorToast();
    });
  }
  goToProductAttr()
  {
    this.navCtrl.push("ProductAttrPage",{
     productProperty : this.productProperty
    });
  }

}
