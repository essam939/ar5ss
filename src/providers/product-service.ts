import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";
import {CustomerService} from "./customer-service";
import {CacheService} from 'ionic-cache';
import {Observable} from "rxjs";

/*
  Generated class for the ProductService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {
  public getVatUrl :string =  MainService.baseUrl+"getvat"  ;
  public categoryUrl : string = MainService.baseUrl+"category/";
  public categoryProductsUrl : string = MainService.baseUrl+"getcategorydeatails/";
  public hotadsUrl : string = MainService.baseUrl+"hotads/";
  public groupShowUrl : string = MainService.baseUrl+"groupshow/";
  public groupProductPaginateUrl : string = MainService.baseUrl+ "getgrouppaginate/";
  public hotOfferUrl : string = MainService.baseUrl+"hotoffer/";
  public productDetailsUrl : string = MainService.baseUrl+"productDetails/";
  public productBarcodeUrl : string = MainService.baseUrl+"productBarcode/";
  public productColorUrl : string = MainService.baseUrl+"productcolor";
  public searchProductUrl : string = MainService.baseUrl+"serachproduct/";
  public getProductPropertyUrl : string = MainService.baseUrl+"getPoductValue/";
  public getProductSortUrl : string = MainService.baseUrl+"getproductsort/";
  public getGroupProductsUrl : string = MainService.baseUrl+"getproductofgroupshow/";
  public getCitiesUrl : string =  MainService.baseUrl+"getCity";
  public ahmedCitUrl:string = MainService.baseUrl+"city";

  public readonly sortByASC : number = 1 ;
  public readonly sortByDESC : number = 2 ;




  constructor(public http: Http ,public customerService : CustomerService ,
              public cache : CacheService) {
    console.log('Hello ProductService Provider');
  }
  getGroupProducts(GroupID : number)
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    return this.http.get(this.getGroupProductsUrl + userKey + '/' + GroupID  + '/'+this.customerService.cityName+'?lang=' + MainService.lang).map((res) => res.json());
  }
  searchProduct(KeyWord : string)
  {
    let body = {
      KeyWord : KeyWord
    };
    return this.http.post(this.searchProductUrl + this.customerService.cityName , body ).map((res) => res.json());
  }
  getProductProperty(ProductID : number)
  {
    return this.http.get(this.getProductPropertyUrl + ProductID + '?lang=' + MainService.lang).map((res) => res.json());
  }
  getVat()
  {
    return this.http.get(this.getVatUrl).map((res) => res.json());
  }
  productColor(ProductID : number , ColorID : number)
  {
    let body = {
      ProductID : ProductID ,
      ColorID : ColorID
      };
    return this.http.post(this.productColorUrl , body ).map((res) => res.json());
  }
  productBarcode(barcode : any)
  {
    return this.http.get(this.productBarcodeUrl+barcode).map((res) => res.json());
  }
  productDetails(ProductID : number)
  {
    let url = this.productDetailsUrl+ProductID + '?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());
    // let request = this.http.get(url).map((res) => res.json());
    // return this.cache.loadFromObservable(url,request);
  }
  hotOffer()
  {
    return this.http.get(this.hotOfferUrl + this.customerService.cityName+'?lang=' + MainService.lang ).map((res) => res.json());
  }
  category(cityName : string)
  {
    return this.http.get(this.categoryUrl + cityName +'?lang='+ MainService.lang).map((res) => res.json());
  }
  hotads()
  {
    return this.http.get(this.hotadsUrl + this.customerService.cityName).map((res) => res.json());
  }
  groupShow()
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    let url = this.groupShowUrl + userKey + '/'+this.customerService.cityName+'?lang=' + MainService.lang  ;
    return this.http.get(url).map((res) => res.json());
    // let request = this.http.get(url).map((res) => res.json());
    // return this.cache.loadFromObservable(url,request);
  }
  getProductSort( sortBy : number , category_id : number ): Observable<any>
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    let url = this.getProductSortUrl + userKey + '/' + sortBy + '/' + category_id +'/'+this.customerService.cityName+'?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());

  }
  groupProductPaginate(GroupID : number , CurrentPage : number)
  {
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    let url = this.groupProductPaginateUrl + userKey + '/' + GroupID + '/' + CurrentPage +'?lang=' + MainService.lang ;
    return this.http.get(url).map((res) => res.json());
    // let request = this.http.get(url).map((res) => res.json());
    // return this.cache.loadFromObservable(url,request);
  }
  categoryProducts(category_id : number , CurrentPage : number ,sortBy? : number)
  {
    if(sortBy == null)
      sortBy = this.sortByASC ;
    let userKey : string ;
    if(this.customerService.customer != null)
      userKey = this.customerService.customer.UserID;
    else userKey = this.customerService.deviceToken ;
    return this.http.get(this.categoryProductsUrl + CurrentPage + '/' + userKey + '/' + category_id + '/' + sortBy +'/'+this.customerService.cityName+ '?lang=' + MainService.lang).map((res) => res.json());
  }
  getCityName(lat : number , lng : number):Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyCYFqMKHgmsx_Jn0PailkhqazDIeOCS-oQ&language=en")
      .map((res) => res.json());
    // res.results[res.results.length-2].address_components[0].long_name
  }
  getCities(lang):Observable<any>{
    return this.http.get(this.ahmedCitUrl+"?lnag="+lang).map((res) => res.json());
  }
}
