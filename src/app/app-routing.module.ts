import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then((module) => module.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
