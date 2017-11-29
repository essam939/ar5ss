/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SearchPage} from "./search";
@NgModule({
  declarations : [
    SearchPage
  ],
  imports : [
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild()
  ],
  exports : [
    SearchPage
  ]
})
export class SearchPageModule {}
