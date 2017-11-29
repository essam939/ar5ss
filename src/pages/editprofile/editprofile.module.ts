/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {Editprofile} from "./editprofile";
@NgModule({
  declarations : [
    Editprofile
  ],
  imports : [
    IonicPageModule.forChild(Editprofile),
    TranslateModule.forChild()
  ],
  exports : [
    Editprofile
  ]
})
export class EditprofileModule {}
