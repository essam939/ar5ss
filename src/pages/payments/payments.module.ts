/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {PaymentsPage} from "./payments";
@NgModule({
  declarations : [
    PaymentsPage
  ],
  imports : [
    IonicPageModule.forChild(PaymentsPage),
    TranslateModule.forChild()
  ],
  exports : [
    PaymentsPage
  ]
})
export class PaymentsPageModule {}
