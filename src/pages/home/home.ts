import {Component, ViewChild} from '@angular/core';
import {NavController, IonicPage, Slides, AlertController} from 'ionic-angular';
import {ProductService} from "../../providers/product-service";
import {DomSanitizer} from "@angular/platform-browser";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {MainService} from "../../providers/main-service";
import {Geolocation} from "@ionic-native/geolocation";
import {Network} from "@ionic-native/network";
import {DbService} from "../../providers/db-service";
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hotads : any ;
  public groupShow : any[] ;
  public cart : any[] = [] ;
  public cartNo : number = 0 ;
  public productSearchResult : any[] ;
  public showSearch : boolean = false ;
  public KeyWord : string  ;
  public MainService : MainService =  MainService ;
  public cities : any[] ;
  public pageLang : string = MainService.lang;
  public can ; ctx ; step ;  steps = 0;
  public delay = 20;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController , public productService : ProductService ,
    public translate : TranslateService , private sanitizer: DomSanitizer , public customerService : CustomerService ,
              public commonService : CommonService , private barcodeScanner: BarcodeScanner ,
              private geolocation : Geolocation,public  network:Network, public dbService : DbService,private keyboard: Keyboard) {

          this.getGroupShow();

    //setTimeout(()=> this.initObjects() , 6000);
       this.fireWhenOffline();
//this.checkLocation();
  }


  checkLocation()
  {
  this.customerService.customerSetLocation();
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude,resp.coords.longitude
    //24.790529, 46.811053
    this.productService.getCityName(resp.coords.latitude,resp.coords.longitude).subscribe((res : any)=>{
      console.log(res);
      console.log(res.results[0].address_components[3].long_name);
      let ccName = res.results[0].address_components[3].long_name;
      if(res.results.length > 0){
        this.customerService.cityName = ccName.replace(' Province','');
        console.log(this.customerService.cityName);

       // this.showAlert(this.customerService.cityName);
      }
    });
  }).catch((error) => {
    console.log(error);
  });
  }
  /////////////////////////////////////////

    showAlert(cname) {

    
      this.translate.get('if you want another town go to the top choose it').subscribe(
        value => {
          // value is our translated string
          let alert = this.alertCtrl.create({
            title: cname,
            subTitle: value,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  console.log(this.customerService.cityName);
                  this.productService.groupShow().subscribe((res)=>{
                 
                  });
                }
              }
            ]
          });
          alert.present();
        }
      )
    }

    hideScreen(){
      
      this.keyboard.close();
    }
  initObjects(){
    this.getGroupShow();
    this.countCart();
    console.log('fired');

  }


  ionViewDidLoad()
  {
    this.getGroupShow();
    this.productService.getCities(this.pageLang).subscribe((res)=>{
      console.log('res res res res',res);
      this.cities = res ;
    });

    console.log("ion View Did Load");


   // this.initObjects();
  }
  ionViewWillEnter()
  {
    // if(this.pageLang != MainService.lang)
    //   this.initObjects();
    this.initObjects();
    //this.countCart();
  }




  countCart()
  {
    this.customerService.getCart().subscribe((cartRes)=>{
      this.cart = cartRes ;
      this.cartNo = this.cart.length ;
    });
  }
  ionViewWillUnload(){
    console.log('deallocate');
    this.groupShow = [] ;
  }
  getGroupShow()
  {
    this.productService.groupShow().subscribe((res:any)=>{
      this.groupShow = res ;
      this.productService.hotads().subscribe((res)=>{
        console.log(res)
        this.hotads = res ;
        console.log("hot adds", this.hotads);
        console.log(this.groupShow);
      });
      //console.log(res);
     //console.log(this.groupShow);
    });
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  goToHotOffers(CategoryID : number , ProductID : number)
  {
    console.log('herere ' ,CategoryID , ProductID);
    if(CategoryID != 0 )
      this.navCtrl.push("CategoryPage",{
        category_id : CategoryID
      });
    else if(ProductID != 0 )
      this.navCtrl.push("DetailsPage",{
        ProductID : ProductID
    });
    else this.navCtrl.push("HotoffersPage");
  }
  gotosearch(){
    this.navCtrl.push("SearchPage");
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
  viewProduct(ProductID : number)
  {
    this.navCtrl.push("DetailsPage",{
      ProductID :ProductID
    });
  }
  goToCart()
  {
    this.navCtrl.push("ShoppingcartsPage");
  }
  searchProduct(){
  if(this.KeyWord != ''){
      //this.commonService.presentLoading('Please Wait ...');
      this.showSearch = true ;
      this.productService.searchProduct(this.KeyWord).subscribe((res)=>{
        this.productSearchResult = res ;
        //this.commonService.dismissLoading();
       
      });
    }
    else
      this.showSearch = false ;
  }
  scan()
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      if(!barcodeData.cancelled){
        this.KeyWord = barcodeData.text ;
        this.searchProduct();
      }
    }, (err) => {
      // An error occurred
      console.log(err);
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }

   opencat(){
    this.navCtrl.push("CategoryPage");
  }
  openfav(){
    this.navCtrl.push("WishlistPage");
  }
  openpro(){
    this.navCtrl.push("Profile");
  }
  opensett(){
    this.navCtrl.push("Settings");
  }
  loadNext(GroupShowID : number)
  {
    let GroupIndex : number ;
    for(GroupIndex = 0 ; GroupIndex < this.groupShow.length ; GroupIndex++)
    {
      if(this.groupShow[GroupIndex].Group.GroupShowID == GroupShowID)
      {
        if(this.groupShow[GroupIndex].Group.CurrentPage != null)
        {
          this.groupShow[GroupIndex].Group.CurrentPage++   ;
          console.log('yes added');
        }
        else
          this.groupShow[GroupIndex].Group.CurrentPage = 2 ;
        break ;
      }
    }
    this.paginateAndRender(GroupShowID ,this.groupShow[GroupIndex].Group.CurrentPage ,GroupIndex);
    console.log('load');
  }
  paginateAndRender(GroupShowID : number ,CurrentPage : number ,GroupIndex : number)
  {
    //this.commonService.presentLoading('Please Wait');
    // setTimeout(() => {
    //   this.commonService.dismissLoading();
    // }, 250);
    this.productService.groupProductPaginate(GroupShowID,CurrentPage).subscribe((products)=>{
      for (let i = 0 ; i < products.data.length ; i++)
      {
        if(this.groupShow[GroupIndex].Group.loadedNo == null)
          this.groupShow[GroupIndex].Group.loadedNo = 4 ;
        else
          this.groupShow[GroupIndex].Group.loadedNo ++;
        this.groupShow[GroupIndex].Products.push(products.data[i]);
      }
    });
  }
  goToGroupProducts(groupID : number , groupName : string){
    this.navCtrl.push("GroupProductsPage",{
      groupID : groupID ,
      groupName : groupName
    });
  }
  fireWhenOffline()
  {
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.customerService.online = false ;
      this.dbService.openOrCreateSQLiteDB();
      this.commonService.translateAndToast('network was disconnected :-(');

    });
  }
  getcName(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.productService.getCityName(24.831381, 46.728981).subscribe((res : any)=>{
        console.log(res);
        console.log(res.results[0].address_components[3].long_name);
        if(res.results.length > 0){
          this.customerService.cityName = res.results[0].address_components[3].long_name;
          console.log(this.customerService.cityName);
          if(this.customerService.customer == null){
            //this.showAlert();
          }
        }
      });
    });
  }

  init() {
    this.can = document.getElementById("MyCanvas1");
    this.ctx = this.can.getContext("2d");
    this.ctx.fillStyle = "blue";
    this.ctx.font = "20pt Verdana";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.step = 320;
    this.steps = 0;
    this.RunTextLeftToRight();
}
RunTextLeftToRight() {
  this.step--;
  this.ctx.clearRect(0, 0,  this.can.width,  this.can.height);
  this.ctx.save();
  this.ctx.translate(this.step, this.can.height / 2);
  this.ctx.fillText("Welcome", 0, 0);
  this.ctx.restore();
  if ( this.step == this.steps)
  this.step = 320;
  if ( this.step > this.steps)
      var t = setTimeout('RunTextLeftToRight()',  this.delay);
}
  // showAlert() {
  //   this.translate.get('if you want another town go to the top choose it').subscribe(
  //     value => {
  //       // value is our translated string
  //       let alert = this.alertCtrl.create({
  //         title: this.customerService.cityName,
  //         subTitle: value,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }
  //   )
  // }
}
