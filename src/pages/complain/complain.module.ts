/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {Complain} from "./complain";
@NgModule({
  declarations : [
    Complain
  ],
  imports : [
    IonicPageModule.forChild(Complain),
    TranslateModule.forChild()
  ],
  exports : [
    Complain
  ]
})
export class ComplainModule {}
