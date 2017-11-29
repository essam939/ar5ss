import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupProductsPage } from './group-products';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GroupProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupProductsPage),
    TranslateModule.forChild()
  ],
  exports: [
    GroupProductsPage
  ]
})
export class GroupProductsPageModule {}
