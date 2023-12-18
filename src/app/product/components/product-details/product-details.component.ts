import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId?: number;
  product?: IProduct;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.error = '';
    this.isLoading = true;

    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];

      if (!isNaN(this.productId)) {
        this.productsService.getProduct(this.productId).subscribe({
          next: (responseData) => {
            this.product = responseData;
            this.isLoading = false;
          },
          error: (error) => {
            this.error = 'There was a problem retrieving the product!';
            this.isLoading = false;
          },
        });
      } else {
        this.error = 'There was a problem retrieving the product!';
        this.isLoading = false;
      }
    });
  }

  onEdit() {
    this.router.navigate([`/products/${this.product?.id}/edit`]);
  }
}
