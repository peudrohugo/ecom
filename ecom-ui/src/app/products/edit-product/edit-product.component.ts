import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  productId!: number;

  name = new FormControl('', [Validators.required]);
  description = new FormControl('');
  image = new FormControl('');
  price = new FormControl(null, [Validators.required, Validators.min(1)]);
  inStock = new FormControl(null, [Validators.required, Validators.min(1)]);
  minStock = new FormControl(null, [Validators.required, Validators.min(1)]);
  maxStock = new FormControl(null, [Validators.required, Validators.min(1)]);

  editProductForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = parseInt(params.get('id')!);
      this.productsService.getProduct(this.productId).subscribe({
        next: (data: HttpResponse<Product>) => {
          if (data.status === 200) {
            this.updateForm(data.body!);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
        },
      });
    });
  }

  validateQuantityInStock(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: number = control.value;

      if (value < this.minStock.value!) {
        return {
          invalid: true,
          message:
            'A quantidade em estoque não pode ser menor que o mínimo permitido!',
        };
      }

      if (value > this.maxStock.value!) {
        return {
          invalid: true,
          message:
            'A quantidade em estoque não pode ser maior que o máximo permitido!',
        };
      }

      return null;
    };
  }

  createForm(): void {
    this.editProductForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      image: this.image,
      price: this.price,
      inStock: this.inStock,
      minStock: this.minStock,
      maxStock: this.maxStock,
    });
  }

  updateForm(product: Product): void {
    this.editProductForm.setValue({
      name: product.name,
      description: product.description,
      image: product.imageUrl,
      price: product.price,
      inStock: product.inStock,
      minStock: product.minStock,
      maxStock: product.maxStock,
    });

    this.editProductForm
      .get('inStock')
      ?.addValidators(this.validateQuantityInStock());
  }

  confirmEdit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Tem certeza?',
        message: 'As informações desse produto serão alteradas!',
      },
    });

    dialogRef.afterClosed().subscribe((toEdit: boolean) => {
      if (toEdit) {
        this.edit();
      }
    });
  }

  edit(): void {
    const productToEdit: Product = {
      name: this.editProductForm.value['name']!,
      description: this.editProductForm.value['description']!,
      imageUrl: this.editProductForm.value['image']!,
      price: this.editProductForm.value['price']!,
      inStock: this.editProductForm.value['inStock']!,
      minStock: this.editProductForm.value['minStock']!,
      maxStock: this.editProductForm.value['maxStock']!,
    };

    this.productsService
      .updateProduct(this.productId, productToEdit)
      .subscribe({
        next: (data: HttpResponse<Product>) => {
          if (data.status === 200) {
            this.snackBar.open('Produto editado com sucesso!', '', {
              duration: 2500,
            });
            this.router.navigate(['/', 'products']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          this.snackBar.open('Houve um problema ao tentar editar o produto!');
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/', 'products']);
  }
}
