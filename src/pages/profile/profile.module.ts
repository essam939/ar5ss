/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {Profile} from "./profile";
@NgModule({
  declarations : [
    Profile
  ],
  imports : [
    IonicPageModule.forChild(Profile),
    TranslateModule.forChild()
  ],
  exports : [
    Profile
  ]
})
export class ProfileModule {}
