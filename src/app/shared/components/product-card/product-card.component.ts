import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '../../../product/models/iproduct';

import { ProductsService } from '../../../product/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product?: IProduct;
  @Output() deleteProduct: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  onEdit() {
    this.router.navigate([`/products/${this.product?.id}/edit`]);
  }

  onDelete() {
    this.productsService.deleteProduct(this.product!.id).subscribe({
      next: (responseData: any) => {
        console.log(responseData);
        this.deleteProduct.emit(responseData.title);
      },
      error: (error) => console.log(error),
    });
  }

  onThumbnailClick() {
    this.router.navigate([`/products/${this.product?.id}`]);
  }
}
