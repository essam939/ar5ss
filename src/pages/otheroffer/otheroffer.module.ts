/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {OtherofferPage} from "./otheroffer";
@NgModule({
  declarations : [
    OtherofferPage
  ],
  imports : [
    IonicPageModule.forChild(OtherofferPage),
    TranslateModule.forChild()
  ],
  exports : [
    OtherofferPage
  ]
})
export class OtherofferPageModule {}
