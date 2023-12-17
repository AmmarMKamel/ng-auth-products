import { Injectable } from '@angular/core';

import { IProduct } from '../models/iproduct';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  getProducts(limit: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('limit', limit);

    return this.http.get<{
      limit: number;
      skip: number;
      total: number;
      products: IProduct[];
    }>('https://dummyjson.com/products', {
      params: searchParams,
    });
  }
}
