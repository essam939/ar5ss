import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogPage } from './log';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LogPage,
  ],
  imports: [
    IonicPageModule.forChild(LogPage),
    TranslateModule.forChild()
  ],
  exports: [
    LogPage
  ]
})
export class LogPageModule {}
