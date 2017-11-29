import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, LoadingController, Loading} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subscriber} from "rxjs";

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {
  public loader : Loading;
  public readonly maxRate: number = 5;
  public iconEmpty: string = 'star-outline';
  public iconFull: string = 'star';
  constructor(public http: Http,public toastCtrl : ToastController ,
              public translateService : TranslateService , public loadingCtrl : LoadingController) {
    console.log('Hello CommonService Provider');
  }
  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 1000,
      position: 'middle'
    });
    toast.present();
  }
  successToast()
  {
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);
      }
    );


  }
  errorToast()
  {
    this.translateService.get('Error').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
  }
  translateAndToast(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
  }
  getTranslation(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        return value;

      }
    );
  }
  public translateArray(words : string[])
  {
    let values = [];
    for (let i = 0; i < words.length; i++) {
      this.translateService.get(words[i]).subscribe(
        value => {
          // value is our translated string
          values.push(value);
        }
      );
    }
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(values);
      observer.complete();
    });
  }




  presentLoading(txt:string) {
    this.loader = this.loadingCtrl.create({
      content: txt
    });
    this.loader.present();
  }
  dismissLoading(){
    this.loader.dismiss();
  };
  isArray(ar) {
    return Object.prototype.toString.call(ar) === '[object Array]';
  }
  checkProductIsExistInFavorite(FavoriteArray : any ,value: any)
  {
    let ArrayFilter :any ;
    ArrayFilter = FavoriteArray.filter((item) => {
      return (item.ProductID == value);
    });
    if(ArrayFilter.length > 0)
      return true ;
    else return false ;
  }
  checkProductIsExistInCart(CartArray : any ,value: any)
  {
    let ArrayFilter :any[] ;
    ArrayFilter = CartArray.filter((item) => {
      return (item.ProductID == value);
    });
    if(ArrayFilter.length > 0)
      return true ;
    else return false ;
  }
  sumInputValuesWithFilter(inputs : any[]) : number
  {
    let sum : number = 0;
    for(let i = 0 ; i < inputs.length ; i++)
      sum += inputs[i].value ;
    return sum;
  }
  // Rate Service
  public icons(rate : number): string[] {
    let icons = [];
    for (let i = 1; i <= this.maxRate; i++) {
      if (i <= rate) {
        icons.push(this.iconFull);
      }
      else {
        icons.push(this.iconEmpty);
      }
    }
    return icons;
  }
  /*let ArrayFilter :any[] ;
  ArrayFilter = inputs.filter((item) => {
    return (item._native._elementRef.nativeElement.parentElement.id != 'price'+ProductID);
  });*/
  splitFromLastBackSlash(str : string) : string
  {
    let target = str;
    let rest = target.substring(target.lastIndexOf("/")+1,target.length );
    console.log(rest);
    return rest ;
  }
}
