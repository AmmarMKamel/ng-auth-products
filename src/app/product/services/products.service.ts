import { Injectable } from '@angular/core';

import { IProduct } from '../models/iproduct';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: IProduct[] = [];
  pageChanged: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.http.get<IProduct>('https://dummyjson.com/auth/products/' + id);
  }

  getProducts(limit: number, skip: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('limit', limit);
    searchParams = searchParams.append('skip', skip);

    return this.http.get<{
      limit: number;
      skip: number;
      total: number;
      products: IProduct[];
    }>('https://dummyjson.com/auth/products', {
      params: searchParams,
    });
  }

  deleteProduct(productId: number) {
    return this.http.delete(`https://dummyjson.com/auth/products/${productId}`);
  }

  updateProduct(productId: number, product: any) {
    return this.http.patch(
      'https://dummyjson.com/auth/products/' + productId,
      product
    );
  }

  createProduct(product: any) {
    return this.http.post('https://dummyjson.com/auth/products/add', product);
  }
}
