import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  public wishList : any[] = [] ;
  public cart : any[] = [] ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService) {
  }
  ionViewWillEnter()
  {
    this.customerService.getCart().subscribe((res : any[])=>{
      this.cart = res ;
    });
    this.customerService.getWishList().subscribe((res : any[])=>{
      this.wishList = res ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }
  edit(){
    this.navCtrl.push("Editprofile");
  }
  signUp()
  {
    this.navCtrl.push("SignupPage");
  }
  login()
  {
    this.navCtrl.push("LoginPage");
  }
  logOut()
  {
    this.customerService.customerStorageErase();
  }
  history()
  {
    this.navCtrl.push("HistoryPage");
  }
  goToMap()
  {
    this.navCtrl.push("UserLocationsPage");
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
