import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {Geolocation} from "@ionic-native/geolocation";
import {CustomerService} from "../../providers/customer-service";
import {Http} from "@angular/http";


declare var google;

@IonicPage()
@Component({
  selector: 'page-addlocation',
  templateUrl: 'addlocation.html',
})
export class AddlocationPage {
  @ViewChild('map') mapElement: ElementRef;
  public location : any ;
  public map: any;
  public markers = [];
  public lat : number = 0 ;
  public lng : number = 0;
  public place : string ;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private commonService : CommonService ,
              public customerService : CustomerService ,
              public http : Http) {
  }
  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.location = latLng ;
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      google.maps.event.addListener(this.map, 'click', (event) => {
        this.setMapOnAll(null);
        this.location  = event.latLng;
        this.addMarker(this.location);
        });
      this.addMarker(this.map.getCenter());
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  sendCustomerLocation(location)
  {
    this.customerService.addLocation(location.lat(),location.lng(),this.place).subscribe((res)=>{
      if(res.LocationID)
      {
        this.commonService.successToast();
        this.navCtrl.pop();
      }
      else this.commonService.errorToast();
    });
  }
  addMarker(LatLng){
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng
    });
    let content = "<h4>Here</h4>";
    //this.addInfoWindow(marker, content);
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map,marker);
    this.markers.push(marker);
  }
  confirm()
  {
    this.sendCustomerLocation(this.location);
  }
  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

}
