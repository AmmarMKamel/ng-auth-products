import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  isLoading: boolean = false;
  productId?: number;
  productForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    discountPercentage: new FormControl(null, [
      Validators.min(0.01),
      Validators.max(100),
    ]),
    stock: new FormControl(null, [Validators.required, Validators.min(0)]),
    brand: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    thumbnail: new FormControl(null, Validators.required),
    images: new FormArray([]),
  });

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get controls() {
    return (<FormArray>this.productForm.get('images')).controls;
  }

  onSubmit() {
    // if (this.productForm.invalid) {
    //   return;
    // }
    console.log(this.productForm);
    this.productsService.createProduct(this.productForm.value).subscribe({
      next: (responseData) => console.log(responseData),
      error: (error) => console.log(error),
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddImage() {
    (<FormArray>this.productForm.get('images')).push(
      new FormControl(null, Validators.required)
    );
  }

  onDeleteImage(index: number) {
    (<FormArray>this.productForm.get('images')).removeAt(index);
  }
}
