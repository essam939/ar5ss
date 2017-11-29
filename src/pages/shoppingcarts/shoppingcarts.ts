import {Component, ViewChildren} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
@IonicPage()
@Component({
  selector: 'page-shoppingcarts',
  templateUrl: 'shoppingcarts.html',
})
export class ShoppingcartsPage {
  public cartDetails : any[] ;
  public cartTotal : number = 0 ;
  public cartShipping :  number = 0;
  @ViewChildren('prices') itemsPriceRef;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService: CustomerService , public commonService : CommonService ) {

  }
  ionViewWillEnter()
  {
    this.customerService.getCart().subscribe((res)=>{
      console.log(res);
      this.cartDetails = res ;
      this.cartTotal = this.initCartTotal();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingcartsPage');
  }
  gotosummary(){
    if(this.customerService.customer != null)
      this.navCtrl.push("SummaryPage",{
        cartShipping:this.cartShipping ,
        cartTotal:this.cartTotal
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
      shipping += this.cartDetails[i].Shiping ;
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
    this.cartTotal = this.commonService.sumInputValuesWithFilter(this.itemsPriceRef._results );
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

