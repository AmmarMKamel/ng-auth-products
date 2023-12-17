import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [ProductCardComponent],
})
export class SharedModule {}
