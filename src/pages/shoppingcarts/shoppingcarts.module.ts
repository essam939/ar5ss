/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {ShoppingcartsPage} from "./shoppingcarts";
@NgModule({
  declarations : [
    ShoppingcartsPage
  ],
  imports : [
    IonicPageModule.forChild(ShoppingcartsPage),
    TranslateModule.forChild()
  ],
  exports : [
    ShoppingcartsPage
  ]
})
export class ShoppingcartsPageModule {}
