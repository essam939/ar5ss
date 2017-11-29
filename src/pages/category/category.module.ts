/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {CategoryPage} from "./category";
@NgModule({
  declarations : [
    CategoryPage
  ],
  imports : [
    IonicPageModule.forChild(CategoryPage),
    TranslateModule.forChild()
  ],
  exports : [
    CategoryPage
  ]
})
export class CategoryPageModule {}
