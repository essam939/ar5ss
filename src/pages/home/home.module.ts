/**
 * Created by a4p2 on 8/7/2017.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {TranslateModule} from "@ngx-translate/core";
import {InfiniteScrollModule} from "../../directives/infinite-scroll/infinite-scroll.module";
@NgModule({
  declarations : [
    HomePage
  ],
  imports : [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    InfiniteScrollModule
  ],
  exports : [
    HomePage
  ]
})
export class HomePageModule {}
