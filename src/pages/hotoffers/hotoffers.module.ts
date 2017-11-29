/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {HotoffersPage} from "./hotoffers";
@NgModule({
  declarations : [
    HotoffersPage
  ],
  imports : [
    IonicPageModule.forChild(HotoffersPage),
    TranslateModule.forChild()
  ],
  exports : [
    HotoffersPage
  ]
})
export class HotoffersPageModule {}
