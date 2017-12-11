import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController, ModalController, IonicPage} from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {MainService} from "../../providers/main-service";
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";
import {CustomerService} from "../../providers/customer-service";
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  public userLocations : any[] ;
  public paymentTypes : any[] ;
  public PaymentID : number = 0;
  public PaymentString : string = '';
  public LocationID : number = 0 ;
  public LocationName : string = '' ;
  public location : any ;
  public cartTotal : number = 0 ;
  public cartShipping : number = 0 ;
  public flag : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public actionSheetCtrl :  ActionSheetController , public commonService : CommonService ,
              public payPal: PayPal , public customerService : CustomerService , public modalCtrl :ModalController ,
              public nativeGeocoder: NativeGeocoder) {
      this.cartTotal = this.navParams.data.cartTotal ;
      console.log(this.cartTotal);
      this.cartShipping = this.navParams.data.cartShipping ;
      console.log(this.cartShipping);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
  }
  ionViewWillEnter()
  {
    this.getDefaultUserLocation();
    this.customerService.getPaymentTypes().subscribe((res)=>{
      this.paymentTypes = res ;
    });
  }
  getDefaultUserLocation()
  {
    this.customerService.getUserLocation().subscribe((userLocations)=>{
      let ArrayFilter :any[] ;
      ArrayFilter = userLocations.filter((item) => {
        return (item.Defualt == 1);
      });
      if(ArrayFilter.length > 0)
      {
        this.LocationID = ArrayFilter[0].LocationID ;
        this.LocationName =  ArrayFilter[0].Place ;
      }
      console.log(ArrayFilter[0]);
    });
  }
  goaddlocation(){
    this.navCtrl.push("AddlocationPage");
  }
  getUserLocationsButtons(newLocationTrans : string) : any []
  {
    let buttons : any[] = [] ;
    for(let i = 0 ; i < this.userLocations.length ; i++) {
      let button =
        {
          text: this.userLocations[i].Place,
          icon: 'navigate',
          handler: () => {
            this.LocationID = this.userLocations[i].LocationID;
          }
        };
      buttons.push(button);
    }
    let addNewLocationButton =
      {
        text: newLocationTrans,
        icon: 'navigate',
        handler: () => {
          this.navCtrl.push("AddlocationPage");
        }
      };
    buttons.push(addNewLocationButton);
    return buttons ;
  }

  showUserLocations()
  {
    let modal = this.modalCtrl.create("UserLocationsPage");
    modal.present();
    modal.onDidDismiss((res)=>{
      this.location = res ;
      this.LocationID = res.LocationID ;
      this.LocationName = res.Place ;
    });
    /*this.commonService.translateArray(
      [
        'Determine Your Location' ,
        'Add New Location'
      ]).subscribe((translatedArray : string[])=>{
      let actionSheet = this.actionSheetCtrl.create({
        title: translatedArray[0],
        cssClass: 'action-sheets-basic-page',
        buttons: this.getUserLocationsButtons(translatedArray[1])
      });
      actionSheet.present();
    });*/
  }
  handlePaymentTypes(code : number)
  {
    switch(code){
      case CustomerService.paymentPaypalCode:
        this.payPalPayment("10");
        this.PaymentID = CustomerService.paymentPaypalCode;
        this.PaymentString = 'PAYPAL';
        break;
      case CustomerService.paymentCashCode:
        this.PaymentID = CustomerService.paymentCashCode;
        this.PaymentString = 'CASH';
        break;
      default:
        alert("Wrong Grade.........");

    }
  }
  getPaymentTypesButtons() : any []
  {
    let buttons : any[] = [] ;
    for(let i = 0 ; i < this.paymentTypes.length ; i++) {
      let button =
        {
          text: this.paymentTypes[i].payment_nameen,
          handler: () => {
            this.handlePaymentTypes(this.paymentTypes[i].PaymentID);
          }
        };
      buttons.push(button);
    }
    return buttons ;
  }
  showPaymentMethod()
  {
    let modal = this.modalCtrl.create("PaymentsPage",this.paymentTypes);
    modal.present();
    modal.onDidDismiss((res)=>{
      this.PaymentID = res.PaymentID ;
      this.handlePaymentTypes(this.PaymentID);
    });
    /*this.commonService.translateArray(
      ['Payment Method']).subscribe((translatedArray : string[])=>{
      let actionSheet = this.actionSheetCtrl.create({
        title: translatedArray[0],
        cssClass: 'payment',
        buttons: this.getPaymentTypesButtons()
      });
      actionSheet.present();
    });*/
  }
  payPalPayment(amount : string)
  {
    //temp
    this.PaymentID = CustomerService.paymentPaypalCode ;
    this.payPal.init({
      PayPalEnvironmentProduction: MainService.payPalEnvironmentProduction ,//'YOUR_PRODUCTION_CLIENT_ID'
      PayPalEnvironmentSandbox: MainService.payPalEnvironmentSandbox//'YOUR_SANDBOX_CLIENT_ID'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(amount, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          // Successfully paid
          console.log(res);
          this.commonService.successToast();
          this.PaymentID = CustomerService.paymentPaypalCode ;

        }, (res) => {
          // Error or render dialog closed without being successful
          console.log(res);
          this.commonService.presentToast('Error or render dialog closed without being successful');
        });
      }, (res) => {
        // Error in configuration
        console.log(res);
        this.commonService.presentToast('Error in configuration');
      });
    }, (res) => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log(res);
      this.commonService.presentToast('Error in initialization, maybe PayPal isnt supported or something else');
    });
  }
  confirmOrder()
  {
    this.commonService.presentLoading("please Wait .....");
    this.flag = true;
    this.nativeGeocoder.reverseGeocode(this.location.latitude,this.location.longitude)
      .then((result: NativeGeocoderReverseResult) => {
      console.log(result);
        this.customerService.confirmOrder(this.PaymentID,this.LocationID,result.administrativeArea).subscribe((res)=>{
          if(res.state == '202')
          {
            this.commonService.successToast();
            this.navCtrl.push("LogPage");
            
          }
          else
            this.commonService.errorToast();
        });
    }).catch((error: any) => console.log(error));
    this.commonService.dismissLoading();
  }
go(){
  this.navCtrl.push("LogPage");
}
}
