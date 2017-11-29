/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {UserLocationsPage} from "./user-locations";
@NgModule({
  declarations : [
    UserLocationsPage
  ],
  imports : [
    IonicPageModule.forChild(UserLocationsPage),
    TranslateModule.forChild()
  ],
  exports : [
    UserLocationsPage
  ]
})
export class UserLocationsPageModule {}
