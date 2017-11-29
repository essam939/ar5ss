/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SliderImagePage} from "./slider-image";
@NgModule({
  declarations : [
    SliderImagePage
  ],
  imports : [
    IonicPageModule.forChild(SliderImagePage),
    TranslateModule.forChild()
  ],
  exports : [
    SliderImagePage
  ]
})
export class SliderImagePageModule {}
