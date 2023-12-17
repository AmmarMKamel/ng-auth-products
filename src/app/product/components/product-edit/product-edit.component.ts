import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  isLoading: boolean = false;
  productId?: number;
  product?: IProduct;
  productForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    discountPercentage: new FormControl(null, Validators.min(0.01)),
    stock: new FormControl(null, [Validators.required, Validators.min(0.0)]),
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

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      if (this.productId) {
        this.productsService.getProduct(this.productId).subscribe({
          next: (responseData) => {
            this.isLoading = false;
            this.productForm.patchValue(responseData);
            for (let image of responseData.images) {
              const imageControl = new FormControl(image, Validators.required);
              (this.productForm.get('images') as FormArray).push(imageControl);
            }
            console.log(this.productForm);
            console.log((<FormArray>this.productForm.get('images')).controls);
          },
          error: (error) => console.log(error),
        });
      }
    });
  }

  get controls() {
    return (<FormArray>this.productForm.get('images')).controls;
  }

  onSubmit() {
    if (this.productId !== undefined) {
      this.productsService
        .updateProduct(this.productId, this.productForm.value)
        .subscribe({
          next: (responseData) => console.log(responseData),
          error: (error) => console.log(error),
        });
    } else {
      console.error('Product ID is undefined');
    }
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
