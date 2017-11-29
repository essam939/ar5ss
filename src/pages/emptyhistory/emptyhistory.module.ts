/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {EmptyhistoryPage} from "./emptyhistory";
@NgModule({
  declarations : [
    EmptyhistoryPage
  ],
  imports : [
    IonicPageModule.forChild(EmptyhistoryPage),
    TranslateModule.forChild()
  ],
  exports : [
    EmptyhistoryPage
  ]
})
export class EmptyhistoryPageModule {}
