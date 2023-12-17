import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './components/products/products.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [ProductsComponent, PaginatorComponent, ProductEditComponent, ProductDetailsComponent],
  imports: [ProductRoutingModule, SharedModule, MatPaginatorModule],
})
export class ProductModule {}
