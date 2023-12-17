import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':id/edit', component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
