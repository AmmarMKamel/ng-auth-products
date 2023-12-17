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

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      if (this.productId) {
        this.productsService.getProduct(this.productId).subscribe({
          next: (responseData) => {
            console.log(responseData);
            this.product = responseData;
            this.isLoading = false;
          },
          error: (error) => console.log(error),
        });
      }
    });
  }

  onEdit() {
    this.router.navigate([`/products/${this.product?.id}/edit`]);
  }
}
