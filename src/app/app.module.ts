import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {MainService} from "../providers/main-service";
import {CustomerService} from "../providers/customer-service";
import {CommonService} from "../providers/common-service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Camera} from "@ionic-native/camera";
import {NativeStorage} from "@ionic-native/native-storage";
import {ProductService} from "../providers/product-service";
import {Push} from "@ionic-native/push";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {PayPal} from "@ionic-native/paypal";
import {Geolocation} from "@ionic-native/geolocation";
import {Network} from "@ionic-native/network";
import {CacheModule} from 'ionic-cache';
import {SocialSharing} from "@ionic-native/social-sharing";
import {SQLite} from "@ionic-native/sqlite";
import { DbService } from '../providers/db-service';
import {NativeGeocoder} from "@ionic-native/native-geocoder";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Keyboard } from '@ionic-native/keyboard';
import { FCM } from '@ionic-native/fcm';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainService,
    CustomerService,
    CommonService,
    Camera,
    NativeStorage ,
    ProductService ,
    Push ,
    BarcodeScanner ,
    PayPal ,
    Geolocation ,
    AndroidPermissions,
    Diagnostic,
    Network ,
    SocialSharing ,
    SQLite,
    DbService,
    NativeGeocoder,
    Keyboard,
    FCM
  ]
})
export class AppModule {}
