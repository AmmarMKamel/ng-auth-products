import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [HomeGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
    canActivate: [LoginGuard],
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
