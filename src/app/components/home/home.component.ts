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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts(6, 0).subscribe({
      next: (responseData) => (this.products = responseData.products),
      error: (error) => console.log(error),
    });
  }
}
