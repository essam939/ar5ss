import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAttrPage } from './product-attr';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ProductAttrPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAttrPage),
    TranslateModule.forChild()
  ],
  exports: [
    ProductAttrPage
  ]
})
export class ProductAttrPageModule {}
