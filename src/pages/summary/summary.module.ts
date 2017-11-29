/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SummaryPage} from "./summary";
@NgModule({
  declarations : [
    SummaryPage
  ],
  imports : [
    IonicPageModule.forChild(SummaryPage),
    TranslateModule.forChild()
  ],
  exports : [
    SummaryPage
  ]
})
export class SummaryPageModule {}
