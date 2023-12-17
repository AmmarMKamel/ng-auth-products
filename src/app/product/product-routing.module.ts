import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id/edit', component: ProductEditComponent },
  { path: 'add', component: ProductAddComponent },
  { path: ':id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
