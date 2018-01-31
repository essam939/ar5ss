import { ProductService } from './../../providers/product-service';
import {Component, ViewChildren} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import { NativeStorage } from '@ionic-native/native-storage';
@IonicPage()
@Component({
  selector: 'page-shoppingcarts',
  templateUrl: 'shoppingcarts.html',
})
export class ShoppingcartsPage {
  public cartDetails : any[] ;
  public cartTotal : number = 0 ;
  public cartShipping :  number = 0;
  public vat : number = 0;
  public vat1 : number ;
  public TotalVat : number = 0 ;
  @ViewChildren('prices') itemsPriceRef;
  constructor(public product :ProductService,public navCtrl: NavController, public navParams: NavParams ,
              public customerService: CustomerService , public commonService : CommonService,private nativeStorage: NativeStorage ) {
                this.product.getVat().subscribe((res)=>{
                  console.log(res);
                  console.log(res.value);
                  this.vat = res.value / 100;
                });
  }
  ionViewWillEnter()
  {
    this.customerService.getCart().subscribe((res)=>{
      console.log(res);
      this.cartDetails = res ;
      this.cartTotal = this.initCartTotal();
      this.nativeStorage.setItem('cartlog',this.cartDetails);
    });
    this.product.getVat().subscribe((res)=>{
      console.log(res);
      console.log(res.value);
      this.vat = res.value / 100;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingcartsPage');
  }
  gotosummary(){
    if(this.customerService.customer != null)
      this.navCtrl.push("SummaryPage",{
        cartShipping:this.cartShipping ,
        cartTotal:this.TotalVat
      });
    else this.navCtrl.push("LoginPage");
  }
  initCartTotal() : number
  {
    let sum : number = 0;
    let shipping : number = 0;
    for(let i = 0 ; i < this.cartDetails.length ; i++)
    {
      sum += this.cartDetails[i].ProductPrice * this.cartDetails[i].QTY;
      shipping += this.cartDetails[i].Real_Shiping ;
      this.vat1 = sum * this.vat;
      this.TotalVat = sum + this.vat1;
    }
    this.cartShipping = shipping ;
    return sum;
  }
  updateQTY(QTY : number ,CartID : number)
  {
    this.customerService.updateQTY(QTY , CartID).subscribe((res)=>{
      if(res.state == '202')
      {
        this.commonService.successToast();
        this.updateTotalCart();
      }
      else this.commonService.errorToast();
    });
  }
  updateTotalCart()
  {
    this.cartTotal = this.commonService.sumInputValuesWithFilter(this.itemsPriceRef._results);
    this.vat1 = this.cartTotal * this.vat;
    this.TotalVat = this.cartTotal + this.vat1;
  }
  deleteCart(CartID : number , ProductID : number)
  {
    if(!this.customerService.online){
      this.commonService.translateAndToast("Offline Mode Now , Go Home");
      return ;
    }
    this.customerService.deleteCart(CartID).subscribe((res)=>{
      if(res.state == '202')
      {
        this.deleteFromCartDetails(ProductID);
        this.commonService.successToast();
      }
      else this.commonService.errorToast();
    });
  }
  deleteFromCartDetails(ProductID : number)
  {
    this.cartDetails = this.cartDetails.filter((item) => {
      if(item.ProductID == ProductID)
      {
        this.cartShipping -= item.Shiping;

      }

      return (item.ProductID != ProductID);
    });
    setTimeout(() => {
      this.updateTotalCart();
    }, 500);
  }


}

