import { Component, OnDestroy, OnInit } from '@angular/core';

import { IProduct } from '../../models/iproduct';

import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  productsCount: number = 0;
  skip: number = 0;
  pageChangedSubscription!: Subscription;
  isLoading: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getProducts(0);

    this.pageChangedSubscription = this.productsService.pageChanged.subscribe(
      (pageIndex: number) => {
        this.skip = pageIndex * 10;
        this.getProducts(this.skip);
      }
    );
  }

  ngOnDestroy(): void {
    this.pageChangedSubscription.unsubscribe();
  }

  getProducts(skip: number): void {
    this.productsService.getProducts(10, skip).subscribe({
      next: (responseData) => {
        this.productsCount = responseData.total;
        this.products = responseData.products;
        this.isLoading = false;
      },
      error: (error) => console.log(error),
    });
  }
}
