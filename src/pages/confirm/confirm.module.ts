/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {ConfirmPage} from "./confirm";
@NgModule({
  declarations : [
    ConfirmPage
  ],
  imports : [
    IonicPageModule.forChild(ConfirmPage),
    TranslateModule.forChild()
  ],
  exports : [
    ConfirmPage
  ]
})
export class ConfirmPageModule {}
