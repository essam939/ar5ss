/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {ForgetpassPage} from "./forgetpass";
@NgModule({
  declarations : [
    ForgetpassPage
  ],
  imports : [
    IonicPageModule.forChild(ForgetpassPage),
    TranslateModule.forChild()
  ],
  exports : [
    ForgetpassPage
  ]
})
export class ForgetpassPageModule {}
