import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {CommonService} from "../../providers/common-service";
import {MainService} from "../../providers/main-service";
import {CustomerService} from "../../providers/customer-service";

/**
 * Generated class for the GroupProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-products',
  templateUrl: 'group-products.html',
})
export class GroupProductsPage {
  public showing : string = 'list';
  public groupID : number ;
  public groupName : string ;
  public groupProducts : any[] ;
  public MainService : MainService =  MainService ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public productService : ProductService , public commonService : CommonService ,
              public customerService : CustomerService) {
    this.groupID = this.navParams.data.groupID ;
    this.groupName = this.navParams.data.groupName ;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupProductsPage');
    this.productService.getGroupProducts(this.groupID).subscribe((res : any[])=>{
      this.groupProducts = res ;
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
  addToWishList(ProductID : number, element:any , productObj ?: any )
  {
    if(element.style.color == 'crimson')
      this.removeFav(ProductID , element);
    else
      this.addFav(ProductID , element , productObj);
  }
  addFav(ProductID : number , element : any , productObj ?: any) {
    element.style.color = 'crimson';
    this.customerService.addToWishList(ProductID,productObj.product_name,productObj.Rate,productObj.Image,productObj.ProductPrice)
      .subscribe((res) => {
        if (res == true) {
          this.commonService.successToast();
        }
        // else
        //   this.commonService.errorToast();
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
  addToCart(ProductID : number , SellerID : number,element : any, productObj ?: any )
  {
    console.log(element);
    if(this.commonService.splitFromLastBackSlash(element.src) == 'cart_on.png')
      this.removeCart(ProductID , element);
    else
      this.addCart(ProductID , SellerID ,element,productObj);
  }
  addCart(ProductID : number , SellerID : number ,element : any , productObj ?: any  ) {
    element.src = 'assets/imgs/cart_on.png';
   // if(!this.customerService.online)this.cartNo++;  update in later
    this.customerService.addToCart(ProductID , SellerID,productObj.product_name,productObj.Image,productObj.ProductPrice).subscribe((res)=>{
      if(res == true)
      {
        this.commonService.successToast();
       // this.cartNo++;
      }
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
      {
        this.commonService.successToast();
        //if(this.cartNo != 0) this.cartNo--;
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

}
