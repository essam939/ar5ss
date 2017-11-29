/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {AddlocationPage} from "./addlocation";
@NgModule({
  declarations : [
    AddlocationPage
  ],
  imports : [
    IonicPageModule.forChild(AddlocationPage),
    TranslateModule.forChild()
  ],
  exports : [
    AddlocationPage
  ]
})
export class AddlocationPageModule {}
