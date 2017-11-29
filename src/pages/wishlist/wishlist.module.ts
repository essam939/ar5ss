/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {WishlistPage} from "./wishlist";
@NgModule({
  declarations : [
    WishlistPage
  ],
  imports : [
    IonicPageModule.forChild(WishlistPage),
    TranslateModule.forChild()
  ],
  exports : [
    WishlistPage
  ]
})
export class WishlistPageModule {}
