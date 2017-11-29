/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {AllcategoriesPage} from "./allcategories";
@NgModule({
  declarations : [
    AllcategoriesPage
  ],
  imports : [
    IonicPageModule.forChild(AllcategoriesPage),
    TranslateModule.forChild()
  ],
  exports : [
    AllcategoriesPage
  ]
})
export class AllcategoriesPageModule {}
