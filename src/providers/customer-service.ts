import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";
import {NativeStorage} from "@ionic-native/native-storage";
import {CommonService} from "./common-service";
import {TranslateService} from "@ngx-translate/core";
import {Geolocation} from "@ionic-native/geolocation";
import {Observable} from "rxjs";
import {DbService} from "./db-service";

/*
  Generated class for the CustomerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class CustomerService {

  public cityName : string = "";
  public customer ;
  public lat : any ;
  public lang : any ;
  public online : boolean = true ;
  public deviceToken : string = null;
  public customerCreateUrl : string = MainService.baseUrl+"register/";
  public customerLoginUrl : string = MainService.baseUrl+"login/";
  public customerForgetPasswordUrl : string = MainService.baseUrl+"forgetpassword/";
  public addToWishListUrl : string = MainService.baseUrl+"inserttowishlist";
  public pushLocalWishListUrl : string = MainService.baseUrl+"inserttowishlistoffline";
  public pushLocalCartUrl : string = MainService.baseUrl+"addcartoffline";
  public getWishListByCustomerUrl : string = MainService.baseUrl+"getwishlist/";
  public getWishListByTokenUrl : string = MainService.baseUrl+"getwishlistfortokenid/";
  public addToCartUrl : string = MainService.baseUrl+"addcart";
  public getCartByCustomerUrl : string = MainService.baseUrl+"cart/";
  public getCartByTokenUrl : string = MainService.baseUrl+"cartunregtsiter/";
  public deleteWishlistUrl : string = MainService.baseUrl+"deletWishlist/";
  public deleteFavUrl : string = MainService.baseUrl+"deletefav";
  public getComplainTypesUrl : string = MainService.baseUrl+"complaintype?lang=";
  public insertComplainUrl : string = MainService.baseUrl+"insertcomplain";
  public contactUrl : string = MainService.baseUrl+"contact";
  
  // public contactUrl : string = MainService.baseUrl2+"contact" ; 

  public aboutUrl : string = MainService.baseUrl+"about?lang=";
  public updateUserUrl : string = MainService.baseUrl+"updateuser/";
  public updateQtyUrl : string = MainService.baseUrl+"modifaycart/";
  public deleteCartUrl : string = MainService.baseUrl+"deletecart/";
  public delCartUrl : string = MainService.baseUrl+"deleteproductfromcart";
  public addLocationUrl : string = MainService.baseUrl+"addlocation";
  public getUserLocationUrl : string = MainService.baseUrl+"userlocation/";
  public deleteUserLocationUrl : string = MainService.baseUrl+"deletelocation/";
  public setDefaultLocationUrl : string = MainService.baseUrl+"setDefultLocation/";
  public getPaymentTypesUrl : string = MainService.baseUrl+"payment?lang=";
  public confirmOrderUrl : string = MainService.baseUrl+"insertorder";
  public orderHistoryUrl : string = MainService.baseUrl+"orderhiostry/";
  public customerRateUrl : string = MainService.baseUrl+"rate";
  public getRelatedProductUrl : string = MainService.baseUrl+"getrelatedproduct/";
  public getCitiesUrl : string = MainService.baseUrl+"city";
  public setCityForGuestUrl : string = MainService.baseUrl+"setcityforguest";





  public static readonly paymentVisaCode = 1 ;
  public static readonly paymentPaypalCode = 2 ;
  public static readonly paymentMadaCode = 3 ;
  public static readonly paymentSdadCode = 4 ;
  public static readonly paymentCashCode = 5 ;

  public static readonly RecentOrderCode = 1 ;
  public static readonly LastOrderCode = 2 ;


  constructor(public http: Http,public nativeStorage : NativeStorage,
              public commonService : CommonService, public translateService :TranslateService ,
              public geolocation: Geolocation  , public dbService : DbService) {
    console.log('Hello CustomerService Provider');
  }
  setCityForGuest(CityID : number){
    let body = {
      CityID : CityID ,
      TokenID : this.deviceToken
    };
    return this.http.post(this.setCityForGuestUrl,body).map((res) => res.json());
  }
  getCities(){
    return this.http.get(this.getCitiesUrl).map((res) => res.json());
  }
  pushLocalWishList()
  {
    this.dbService.execFavLocalGet().then((sqliteRes)=>{
         this.http.post(this.pushLocalWishListUrl , this.dbService.sqliteResToArr(sqliteRes) ).map((res) => res.json()).subscribe((res)=>{
           if(res == true)
             this.dbService.execFavLocalDel().then(()=>console.log('fav table is empty')).catch((err)=>console.log(err))
         });
    }).catch((err)=>console.log(err))
  }
  pushLocalCart()
  {
    this.dbService.execCartLocalGet().then((sqliteRes)=>{
      this.http.post(this.pushLocalCartUrl , this.dbService.sqliteResToArr(sqliteRes) ).map((res) => res.json()).subscribe((res)=>{
        if(res == true)
          this.dbService.execCartLocalDel().then(()=>console.log('cart table is empty')).catch((err)=>console.log(err))
      });
    }).catch((err)=>console.log(err))
  }
  setDefaultLocation(LocationID : number){
    return this.http.put(this.setDefaultLocationUrl + LocationID , {} ).map((res) => res.json());
  }
  deleteUserLocation(LocationID : number){
    return this.http.delete(this.deleteUserLocationUrl + LocationID ).map((res) => res.json());
  }
  getRelatedProduct(ProductID : number)
  {
    return this.http.get(this.getRelatedProductUrl + ProductID + '/' +this.cityName+ '?lang='  + MainService.lang ).map((res) => res.json());
  }
  customerRate(OrderID : number , ProductID : number , Rate : number)
  {
    let body = {
      ProductID : ProductID,
      Rate : Rate,
      UserID : this.customer.UserID ,
      OrderID : OrderID
    };
    return this.http.post(this.customerRateUrl , body ).map((res) => res.json());
  }
  deleteFav(ProductID : number) : Observable <any>
  {
    if(this.online)
      return this.deleteFavOnline(ProductID);
    else return this.deleteFavOffline(ProductID);
  }
  deleteFavOffline(ProductID : number) : Observable<any>
  {
    return Observable.fromPromise(this.dbService.execFavLocalDelByProductID(ProductID).then((res)=>{
      console.log(res);
      console.log('deleted');
    })
      .catch((err)=>{
        console.log(err);
      })).map(()=>{
      let data = {
        state : '202'
      } ;
      return data ;
    });
  }
  deleteFavOnline(ProductID : number)
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken
      };
    }
    return this.http.post(this.deleteFavUrl , body ).map((res) => res.json());
  }
  orderHistory(OrderState : number)
  {
    let body = {
      OrderState : OrderState
    };
    return this.http.post(this.orderHistoryUrl + this.customer.UserID , body ).map((res) => res.json());
  }
  confirmOrder(PaymentID :  number , LocationID : number , CityName : string)
  {
    let body = {
      UserID : this.customer.UserID ,
      PaymentID : PaymentID ,
      LocationID : LocationID,
      CityName : CityName
    };
    return this.http.post(this.confirmOrderUrl , body ).map((res) => res.json());
  }
  getPaymentTypes()
  {
    return this.http.get(this.getPaymentTypesUrl + MainService.lang ).map((res) => res.json());
  }
  getUserLocation() {
    return this.http.get(this.getUserLocationUrl + this.customer.UserID ).map((res) => res.json());
  }
  addLocation(latitude : string , longitude : string , Place : string)
  {
    let body = {
      UserID : this.customer.UserID,
      latitude : latitude ,
      longitude :  longitude ,
      Place : Place
    };
    return this.http.post(this.addLocationUrl , body ).map((res) => res.json());
  }

  deleteCart(CartID : number  ) : Observable<any> {
    if(this.online)
      return this.deleteCartOnline(CartID);
    else return this.deleteCartOffline(CartID);
  }
  deleteCartOnline(CartID : number  ) : Observable<any>
  {
    return this.http.delete(this.deleteCartUrl + CartID ).map((res) => res.json());
  }
  deleteCartOffline(CartID : number  ) : Observable<any>
  {
     return Observable.fromPromise(this.dbService.execCartLocalDelByID(CartID).then((res)=>{
      console.log(res);
      console.log('deleted');
    })
      .catch((err)=>{
        console.log(err);
      })).map(()=>{
      let data = {
        state : '202'
      } ;
      return data ;
    });
  }
  delCart(ProductID : number) : Observable<any>
  {
    if(this.online)
      return this.delCartOnline(ProductID);
    else return this.delCartOffline(ProductID) ;
  }
  delCartOffline(ProductID : number) : Observable<any>
  {
    return Observable.fromPromise(this.dbService.execCartLocalDelByProductID(ProductID).then((res)=>{
      console.log(res);
      console.log('deleted');
    })
      .catch((err)=>{
        console.log(err);
      })).map(()=>{
      let data = {
        state : '202'
      } ;
      return data ;
    });
  }
  delCartOnline(ProductID : number) : Observable<any>
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken
      };
    }
    return this.http.post(this.delCartUrl , body ).map((res) => res.json());
  }
  updateQTY(QTY : number ,  CartID : number  ) {
    let body = {
      QTY: QTY
    };
    return this.http.put(this.updateQtyUrl + CartID , body).map((res) => res.json());
  }
  updateUser(Name : string ,
             Email : string ,
             Mobile : string ,
             Image: string  ,
             Password ?: string ) {
    let customer = {
      Name: Name,
      Email: Email,
      Mobile: Mobile,
      Image: Image ,
      Password : Password
    };
    return this.http.put(this.updateUserUrl + this.customer.UserID , customer).map((res) => res.json());
  }
  about()
  {
    return this.http.get(this.aboutUrl+MainService.lang).map((res) => res.json());
  }
  contact(Email : string,Title : string,Body : string)
  {
    let body = {
      Email : Email ,
      Title : Title , 
      Body : Body
    };
    return this.http.post(this.contactUrl,body).map((res) =>{
      console.log('ress',res)
      res.json()});
  }

  insertComplain(UserID : number, ComplainTypeId : number, Tittle :string, Descriotion : string)
  {
    let body = {
      UserID : UserID,
      ComplainTypeId : ComplainTypeId ,
      Tittle : Tittle,
      Descriotion : Descriotion
    };
    return this.http.post(this.insertComplainUrl,body).map((res) => res.json());
  }
  getComplainTypes()
  {
    return this.http.get(this.getComplainTypesUrl+MainService.lang).map((res) => res.json());
  }
  deleteWishlist(favoritID : number)
  {
    if(this.online)
      return this.deleteWishlistOnline(favoritID);
    else return this.deleteWishlistOffline(favoritID);
  }
  deleteWishlistOnline(favoritID : number) : Observable<any>
  {
      return this.http.delete(this.deleteWishlistUrl+favoritID).map((res) => res.json());
  }
  deleteWishlistOffline(favoritID : number) : Observable<any>
  {
    return Observable.fromPromise(this.dbService.execFavLocalDelByID(favoritID).then((res)=>{
      console.log(res);
      console.log('deleted');
    })
      .catch((err)=>{
        console.log(err);
      })).map(()=>{
      let data = {
        stats : 'done'
      } ;
      return data ;
    });
  }
  addToCart(ProductID : number, SellerID : number ,ProductName ?: string, Image ?: string , ProductPrice ?: number) : Observable<any>
  {
    if(this.online)
      return this.addToCartOnline(ProductID,SellerID);
    else this.addToCartOffline(ProductID , SellerID ,ProductName , Image ,ProductPrice);
  }
  addToCartOffline(ProductID : number, SellerID : number ,ProductName : string, Image: string , ProductPrice : number)
  {
    let UserID : number = 0 ;
    if(this.customer != null)
      UserID = this.customer.UserID ;
    this.dbService.checkIfTableExist('Cart').then((exist)=>{
      if(exist.rows.length > 0)
      {
        this.execCartLocalInsertion(UserID,ProductID , SellerID ,ProductName , Image ,ProductPrice);
      }
      else
      {
        this.dbService.createCartTable()
          .then(()=>{
            console.log('cart table is created');
            this.execCartLocalInsertion(UserID,ProductID , SellerID ,ProductName , Image , ProductPrice);
          })
          .catch((err)=>console.log(err)) ;
      }

    })
      .catch((err)=>console.log(err));
  }
  execCartLocalInsertion(UserID : number, ProductID : number, SellerID : number ,ProductName : string, Image: string , ProductPrice : number)
  {
    this.dbService.execCartLocalInsertion(UserID , this.deviceToken  , ProductID , SellerID ,ProductName , Image , ProductPrice )
      .then((res)=>{
        console.log(res);
        console.log('inserted');
        this.commonService.successToast();
      })
      .catch((err)=>{
        console.log(err);
      });
  }
  addToCartOnline(ProductID : number , SellerID : number)
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID,
        QTY: 1 ,
        Lang : this.lang ,
        Lat : this.lat ,
        SellerID : SellerID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken ,
        QTY: 1 ,
        Lang : this.lang ,
        Lat : this.lat ,
        SellerID : SellerID
      };
    }
    return this.http.post(this.addToCartUrl,body).map((res) => res.json());
  }
  getCartOnline() : Observable<any>
  {
    if(this.customer != null)
      return this.http.get(this.getCartByCustomerUrl+this.customer.UserID + '?lang=' + MainService.lang).map((res) => res.json());
    else
      return this.http.get(this.getCartByTokenUrl+this.deviceToken + '?lang=' + MainService.lang).map((res) => res.json());
  }
  getCartOffline() : Observable<any>
  {
    return Observable.fromPromise(this.dbService.execCartLocalGet()).map((res)=>this.dbService.sqliteResToArr(res));
  }
  getCart() : Observable<any>
  {
    if(this.online)
      return this.getCartOnline();
    else
      return this.getCartOffline();
  }
  addToWishListOffline(ProductID : number, ProductName : string, Rate : number, Image: string , ProductPrice : number)
  {
    let UserID : number = 0 ;
    if(this.customer != null)
      UserID = this.customer.UserID ;
    this.dbService.checkIfTableExist('Favorite').then((exist)=>{
      if(exist.rows.length > 0)
      {
        this.execFavLocalInsertion(UserID,ProductID , ProductName , Rate , Image ,ProductPrice);
      }
      else
      {
        this.dbService.createFavoriteTable()
          .then(()=>{
            console.log('fav table is created');
            this.execFavLocalInsertion(UserID,ProductID , ProductName , Rate , Image , ProductPrice);
          })
          .catch((err)=>console.log(err)) ;
      }

    })
      .catch((err)=>console.log(err));
  }
  execFavLocalInsertion(UserID : number ,ProductID : number, ProductName : string, Rate : number, Image: string , ProductPrice : number)
  {
    this.dbService.execFavLocalInsertion(UserID, this.deviceToken  , ProductID , ProductName , Rate , Image , ProductPrice)
      .then((res)=>{
        console.log(res);
        console.log('inserted');
        this.commonService.successToast();
      })
        .catch((err)=>{
          console.log(err);
        });
  }
  addToWishList(ProductID : number, ProductName ?: string, Rate ?: number, Image ?: string , ProductPrice ?: number): Observable<any>
  {
    if(this.online)
      return this.addToWishListOnline(ProductID);
    else this.addToWishListOffline(ProductID , ProductName , Rate , Image ,ProductPrice);
  }
  addToWishListOnline(ProductID : number) : Observable<any>
  {
    let body ;
    if(this.customer != null)
    {
      body = {
        ProductID : ProductID ,
        UserID : this.customer.UserID
      };
    }
    else
    {
      body = {
        ProductID : ProductID ,
        TokenID : this.deviceToken
      };
    }
    return this.http.post(this.addToWishListUrl,body).map((res) => res.json());
  }
  getWishList() : Observable<any>
  {
    if(this.online)
      return this.getWishListOnline();
    else
      return this.getWishListOffline();
  }
  getWishListOnline() : Observable<any>
  {
    if(this.customer != null)
      return this.http.get(this.getWishListByCustomerUrl+this.customer.UserID).map((res) => res.json());
    else
      return this.http.get(this.getWishListByTokenUrl+this.deviceToken).map((res) => res.json());
  }
  getWishListOffline() : Observable<any>
  {
    return Observable.fromPromise(this.dbService.execFavLocalGet()).map((res)=>this.dbService.sqliteResToArr(res));
  }
  customerForgetPassword(Email : string )
  {
    return this.http.post(this.customerForgetPasswordUrl+MainService.lang,{Email:Email}).map((res) => res.json());
  }
  customerCreate(Name : string ,
                 Email : string ,
                 Password : string ,
                 Mobile : string ,
                 Image: string ,
                CityID : number)
  {
    let customer = {
      Name : Name ,
      Email : Email ,
      Password : Password ,
      Mobile : Mobile ,
      UseType : 2 ,
      DivceType : 1 ,
      Token : this.deviceToken ,
      Image : Image ,
      CityID : CityID
    };
    return this.http.post(this.customerCreateUrl+MainService.lang,customer).map((res) => res.json());
  }
  customerLogin(Email : string , Password : string )
  {
    let customer = {
      Email : Email ,
      Password : Password ,
      TokenID : this.deviceToken
    };
    return this.http.post(this.customerLoginUrl+MainService.lang,customer).map((res) => res.json());
  }
  customerStorageSave(customer:any){
    this.nativeStorage.setItem('customer', customer)
      .then(
        () => {
          this.customer = customer;
          console.log('Customer Is Stored!');
        },
        error => console.error('Error storing item', error)
      );
  }
  tokenStorageSave(token:any){
    this.nativeStorage.setItem('token', token)
      .then(
        () => {
          this.deviceToken = token;
          console.log('Token Is Stored!');
        },
        error => console.error('Error storing item', error)
      );
  }
  tokenStorageErase(){
    this.nativeStorage.remove('token')
      .then(
        () => {
          this.deviceToken = null;
          console.log('Token Is Erased!');
        },
        error => console.error(error)
      );
  }
  tokenStorageGet(){
    this.nativeStorage.getItem('token')
      .then(
        (token) => {
          this.deviceToken = token;
          console.log('Token Is Geted!');
          //return customer
        },
        error => console.error(error)
      );
  }
  customerStorageErase(){
    this.nativeStorage.remove('customer')
      .then(
        () => {
          this.customer = null;
          console.log('Customer Is Erased!');
        },
        error => console.error(error)
      );
  }
  customerStorageGet() : Promise<any>{
    return this.nativeStorage.getItem('customer')
      .then(
        (customer) => {
          this.customer = customer;
          console.log('Customer Is Geted!');
          //return customer
        },
        error => console.error(error)
      )
  }
  customerSetLocation()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude ;
      this.lang = resp.coords.longitude ;
      console.log(this.lat + ' ' + this.lat);
    });
  }


}
 