/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {Contact} from "./contact";
@NgModule({
  declarations : [
    Contact
  ],
  imports : [
    IonicPageModule.forChild(Contact),
    TranslateModule.forChild()
  ],
  exports : [
    Contact
  ]
})
export class ContactModule {}
