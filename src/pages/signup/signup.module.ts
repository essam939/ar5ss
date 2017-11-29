/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SignupPage} from "./signup";
@NgModule({
  declarations : [
    SignupPage
  ],
  imports : [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild()
  ],
  exports : [
    SignupPage
  ]
})
export class SignupPageModule {}
