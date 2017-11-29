/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {OrderDetailsPage} from "./order-details";
@NgModule({
  declarations : [
    OrderDetailsPage
  ],
  imports : [
    IonicPageModule.forChild(OrderDetailsPage),
    TranslateModule.forChild()
  ],
  exports : [
    OrderDetailsPage
  ]
})
export class OrderDetailsPageModule {}
