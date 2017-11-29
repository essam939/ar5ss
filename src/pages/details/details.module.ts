/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {DetailsPage} from "./details";
@NgModule({
  declarations : [
    DetailsPage
  ],
  imports : [
    IonicPageModule.forChild(DetailsPage),
    TranslateModule.forChild()
  ],
  exports : [
    DetailsPage
  ]
})
export class DetailsPageModule {}
