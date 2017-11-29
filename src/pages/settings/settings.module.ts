/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {Settings} from "./settings";
@NgModule({
  declarations : [
    Settings
  ],
  imports : [
    IonicPageModule.forChild(Settings),
    TranslateModule.forChild()
  ],
  exports : [
    Settings
  ]
})
export class SettingsModule {}
