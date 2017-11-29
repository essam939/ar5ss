/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import {TranslateModule} from "@ngx-translate/core";
@NgModule({
  declarations : [
    AboutPage
  ],
  imports : [
    IonicPageModule.forChild(AboutPage),
    TranslateModule.forChild()
  ],
  exports : [
    AboutPage
  ]
})
export class AboutPageModule {}
