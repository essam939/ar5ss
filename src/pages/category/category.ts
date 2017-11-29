import {Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {MainService} from "../../providers/main-service";

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public category_id : number ;
  public category_name : string ;
  public categoryProducts : any[] ;
  public cart : any[] = [] ;
  public defaultSortType : number  = this.productService.sortByASC;
  public sortType : number  = this.productService.sortByDESC;
  public CurrentPage : number = 1 ;
  public showing : string = 'list';
  public cartNo : number = 0 ;
  public MainService : MainService = MainService ;
constructor(public navCtrl: NavController, public navParams: NavParams,
              public productService : ProductService , public customerService : CustomerService ,
              public commonService : CommonService) {
    if(this.navParams.data.category_id)
    {
      this.category_id = this.navParams.data.category_id;
      this.category_name = this.navParams.data.category_name;
    }

}

  ionViewWillEnter()
  {
    this.customerService.getCart().subscribe((res : any[])=>{
      this.cart = res ;
      this.cartNo = res.length ;
    });
  }
  ionViewDidLoad()
  {
        this.getcategoryProducts();
  }
  ionViewWillUnload(){
    console.log('deallocate');
    this.categoryProducts = [] ;
  }
  sortBy()
  {
    if(this.sortType == this.productService.sortByASC)
    {
      this.productService.getProductSort(this.productService.sortByASC ,this.category_id ).subscribe((res)=>{
        this.sortType = this.productService.sortByDESC;
        this.categoryProducts = res ;
      });
      // this.sortType = this.productService.sortByDESC;
      // this.categoryProducts.sort((a,b)=>{
      //   if (a.ProductPrice >= b.ProductPrice)
      //     return 1;
      //  return 0;
      // });
    }

    else
      {
        this.productService.getProductSort(this.productService.sortByDESC ,this.category_id ).subscribe((res)=>{
          this.sortType = this.productService.sortByASC;
          this.categoryProducts = res ;
        });
        // this.sortType = this.productService.sortByASC;
        // this.categoryProducts.sort((a,b)=>{
        //   if (a.ProductPrice <= b.ProductPrice)
        //     return 1;
        //   return 0;
        // });
      }
    //this.getcategoryProducts();
  }
  getcategoryProducts()
  {
      this.productService.categoryProducts(this.category_id,this.CurrentPage,this.defaultSortType).subscribe((res) => {
        this.categoryProducts = res.data;
      });
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
    if(!this.customerService.online)this.cartNo++; // update in later
    this.customerService.addToCart(ProductID , SellerID,productObj.product_name,productObj.Image,productObj.ProductPrice).subscribe((res)=>{
      if(res == true)
      {
        this.commonService.successToast();
        this.cartNo++;
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
        if(this.cartNo != 0) this.cartNo--;
      }
      else
        this.commonService.errorToast();
    });
  }
  gotoall(){
    this.navCtrl.push("AllcategoriesPage");
  }
  gotohot(){
    this.navCtrl.push("HotoffersPage");
  }
  gotowish(){
    this.navCtrl.push("WishlistPage");
  }
  gotosearch(){
    this.navCtrl.push("SearchPage");
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
  doInfinite(infiniteScroll)
  {
    this.CurrentPage++;
    this.productService.categoryProducts(this.category_id, this.CurrentPage, this.sortType).subscribe((products) => {
      infiniteScroll.complete();
      for (let i = 0 ; i < products.data.length ; i++)
      {
        this.categoryProducts.push(products.data[i]);
      }
    });
  }
  goToCart()
  {
    this.navCtrl.push("ShoppingcartsPage");
  }
}
