import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/entities/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent {
  name = new FormControl('', [Validators.required]);
  description = new FormControl('');
  image = new FormControl('');
  price = new FormControl(null, [Validators.required, Validators.min(1)]);
  inStock = new FormControl(null, [
    Validators.required,
    Validators.min(1),
    this.validateQuantityInStock(),
  ]);
  minStock = new FormControl(null, [Validators.required, Validators.min(1)]);
  maxStock = new FormControl(null, [Validators.required, Validators.min(1)]);

  newProductForm: FormGroup = this.formBuilder.group({
    name: this.name,
    description: this.description,
    image: this.image,
    price: this.price,
    inStock: this.inStock,
    minStock: this.minStock,
    maxStock: this.maxStock,
  });

  constructor(
    private productsService: ProductsService,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  validateQuantityInStock(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: number = control.value;

      if (value < this.minStock?.value!) {
        return {
          invalid: true,
          message:
            'A quantidade em estoque não pode ser menor que o mínimo permitido!',
        };
      }

      if (value > this.maxStock?.value!) {
        return {
          invalid: true,
          message:
            'A quantidade em estoque não pode ser maior que o máximo permitido!',
        };
      }

      return null;
    };
  }

  async create(): Promise<void> {
    const productObj: Product = {
      name: this.newProductForm.value['name']!,
      description: this.newProductForm.value['description']!,
      imageUrl: this.newProductForm.value['image']!,
      price: this.newProductForm.value['price']!,
      inStock: this.newProductForm.value['inStock']!,
      minStock: this.newProductForm.value['minStock']!,
      maxStock: this.newProductForm.value['maxStock']!,
    };

    await this.productsService.createProduct(productObj).subscribe({
      next: (data: HttpResponse<Product[]>) => {
        if (data.status === 201) {
          this.snackBar.open('Produto cadastrado com sucesso!', '', {
            duration: 2500,
          });
          this.router.navigate(['/', 'products']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        this.snackBar.open(
          'Houve um problema ao tentar cadastrar um novo produto!'
        );
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/', 'products']);
  }

  clear(): void {
    this.newProductForm.reset();
  }
}
