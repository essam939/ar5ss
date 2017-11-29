import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {CustomerService} from "../../providers/customer-service";
import {TranslateService} from "@ngx-translate/core";
import {Camera} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public customer ;
  public image : string ;
  public cities : any[] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public commonService : CommonService , public customerService : CustomerService,
              public translateService : TranslateService , public alertCtrl : AlertController,
              public camera: Camera ) {
    this.customer = {'Image':''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.customerService.getCities().subscribe((res : any[])=>{
      this.cities = res ;
    });
  }
  register()
  {
    this.customerService.customerCreate(
      this.customer.Name,this.customer.Email,this.customer.Password,
      966+this.customer.Mobile,this.customer.Image , this.customer.CityID
    ).subscribe((data)=>{
      if(data.error)
        this.commonService.presentToast(data.error);
      else if (data.Error)
        this.commonService.presentToast(data.Error);
      else
      {
        this.successlogin(data);
      }
    });
  }
  successlogin(customer)
  {
    console.log(customer)
    this.customerService.customer = customer; // temparay has to be deleted
    this.customerService.customerStorageSave(customer);
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);

      }
    );
    this.navCtrl.push("HomePage");
  }
  galleryOrCamera() {
    let confirm = this.alertCtrl.create({
      title:  'Choose method',
      message: 'Choose picture from gallery or camera ?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.pickPicture();
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture();
          }
        }
      ]
    });
    confirm.present();
  }
  pickPicture() {
    //noinspection TypeScriptUnresolvedVariable
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.image_accommodation(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  takePicture(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      correctOrientation : true ,
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.image_accommodation(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  image_accommodation(imageData:any)
  {
      this.image = "data:image/jpeg;base64," + imageData;
      this.customer.Image = this.image; //imageData;
  }
  gotosignin(){
    this.navCtrl.push("LoginPage");
  }
}
