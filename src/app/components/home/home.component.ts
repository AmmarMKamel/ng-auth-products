import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../product/services/products.service';
import { IProduct } from '../../product/models/iproduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;
  deletedProductTitle: string = '';
  productDeletionTimer: any;
  error: string = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = '';

    this.productsService.getProducts(6, 0).subscribe({
      next: (responseData) => {
        this.products = responseData.products;
        this.isLoading = false;

        if (this.products.length === 0) {
          this.error = 'There was a problem getting products!';
        }
      },
      error: (error) => (this.error = 'There was a problem getting products!'),
    });
  }

  onProductDeletion(event: any) {
    this.deletedProductTitle = event;

    if (this.productDeletionTimer) clearTimeout(this.productDeletionTimer);

    this.productDeletionTimer = setTimeout(() => {
      this.deletedProductTitle = '';
    }, 5000);
  }

  resetDeletedProductTitle() {
    this.deletedProductTitle = '';
    if (this.productDeletionTimer) clearTimeout(this.productDeletionTimer);
  }
}
