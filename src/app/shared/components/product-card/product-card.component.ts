import { Component, Input } from '@angular/core';
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

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  onEdit() {
    this.router.navigate([`/products/${this.product?.id}/edit`]);
  }

  onDelete() {
    this.productsService.deleteProduct(this.product!.id).subscribe({
      next: (responseData) => console.log(responseData),
      error: (error) => console.log(error),
    });
  }

  onThumbnailClick() {
    this.router.navigate([`/products/${this.product?.id}`]);
  }
}
