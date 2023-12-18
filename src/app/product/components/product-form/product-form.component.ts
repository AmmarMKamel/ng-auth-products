import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { IProduct } from '../../models/iproduct';

import { ProductsService } from '../../services/products.service';

function urlValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value);

  return isValidUrl ? null : { url: true };
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  isLoading: boolean = false;
  productId?: number;
  product?: IProduct;
  isEditMode: boolean = false;
  error: string = '';
  message: string = '';
  productForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    discountPercentage: new FormControl(null, [
      Validators.min(0),
      Validators.max(100),
    ]),
    stock: new FormControl(null, [Validators.required, Validators.min(0)]),
    brand: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    thumbnail: new FormControl(null, [Validators.required, urlValidator]),
    images: new FormArray([]),
  });

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      this.isEditMode = !isNaN(this.productId);

      if (this.isEditMode) {
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe({
          next: (responseData) => {
            this.isLoading = false;
            this.productForm.patchValue(responseData);

            for (let image of responseData.images) {
              const imageControl = new FormControl(image, [
                Validators.required,
                urlValidator,
              ]);
              (this.productForm.get('images') as FormArray).push(imageControl);
            }
          },
          error: (error) => {
            this.error = 'There was a problem retrieving the product!';
            this.isLoading = false;
          },
        });
      }
    });
  }

  get controls() {
    return (<FormArray>this.productForm.get('images')).controls;
  }

  onSubmit() {
    this.error = '';

    if (this.isEditMode) {
      if (this.productId !== undefined) {
        this.productsService
          .updateProduct(this.productId, this.productForm.value)
          .subscribe({
            next: (responseData) => {
              this.message = 'Product updated successfully!';
              setTimeout(this.onCancel.bind(this), 3000);
            },
            error: (error) => {
              this.error = 'There was a problem updating the product!';
            },
          });
      }
    } else {
      this.productsService.createProduct(this.productForm.value).subscribe({
        next: (responseData) => {
          this.message = 'Product added successfully!';
          setTimeout(this.onCancel.bind(this), 3000);
        },
        error: (error) => {
          this.error = 'There was a problem adding the product!';
        },
      });
    }
  }

  onCancel() {
    console.log('Here!');
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddImage() {
    (<FormArray>this.productForm.get('images')).push(
      new FormControl(null, [Validators.required, urlValidator])
    );
  }

  onDeleteImage(index: number) {
    (<FormArray>this.productForm.get('images')).removeAt(index);
  }
}
