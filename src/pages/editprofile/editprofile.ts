import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, IonicPage} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {Camera} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class Editprofile {
  public image : string ;
  public Image64 : string = null ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public commonService : CommonService ,
              public alertCtrl : AlertController , public camera : Camera ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Editprofile');
  }
  updateUser(inputs : any)
  {
    this.customerService.updateUser(
      inputs.Name ,
      inputs.Email ,
      '966'+inputs.Mobile ,
      this.Image64 ,
      inputs.Password ,
    ).subscribe((res)=>{
      if(res.UserID)
      {
        this.commonService.successToast();
        this.customerService.customer = res ;
        this.navCtrl.pop();
      }
      else
        this.commonService.errorToast();
    });
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
      targetHeight: 1000
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
    this.Image64 = this.image;
  }
}
