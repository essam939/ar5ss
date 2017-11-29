import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
/**
 * Generated class for the CityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {
  public cities : any[] ;
  public CityID : number ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService , public commonService : CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
    this.customerService.getCities().subscribe((res : any[])=>{
      this.cities = res ;
      console.log(res);
    });
  }
  addCity(){
    console.log(this.CityID);
    this.customerService.setCityForGuest(this.CityID).subscribe((res : any)=>{
      if(res.ID){
        this.commonService.successToast();
        this.navCtrl.push("HomePage");
      }
      else this.commonService.errorToast();
    });
  }

}
