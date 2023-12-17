import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [ProductCardComponent, LoadingSpinnerComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [ProductCardComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
