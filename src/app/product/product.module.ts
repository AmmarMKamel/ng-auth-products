import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [ProductRoutingModule, SharedModule],
})
export class ProductModule {}
