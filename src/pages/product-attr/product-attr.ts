import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MainService} from "../../providers/main-service";

/**
 * Generated class for the ProductAttrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-attr',
  templateUrl: 'product-attr.html',
})
export class ProductAttrPage {
  public productProperty : any ;
  public MainService : MainService = MainService ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.productProperty = navParams.data.productProperty ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductAttrPage');
  }

}
