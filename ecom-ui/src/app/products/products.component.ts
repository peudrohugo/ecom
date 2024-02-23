import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { Product } from '../shared/entities/product';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.products = [];
    this.productsService.listProducts().subscribe({
      next: (data: HttpResponse<Product[]>) => {
        if (data.status === 200) this.products = data.body!;
      },
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  async delete(id: number): Promise<void> {
    const dialogRef = this.dialog.open(DeleteProductDialog);

    dialogRef.afterClosed().subscribe((toDelete: boolean) => {
      if (toDelete) {
        this.productsService.deleteProduct(id).subscribe({
          next: (data: HttpResponse<any>) => {
            if (data.status === 200) {
              this.snackBar.open('Produto removido com sucesso!', '', {
                duration: 2500,
              });
            }
            this.loadProducts();
          },
          error: (error: HttpErrorResponse) => console.error(error.message),
        });
      }
    });
  }
}

@Component({
  selector: 'delete-product-dialog',
  templateUrl: './delete-product-dialog.html',
})
export class DeleteProductDialog {
  constructor(public dialogRef: MatDialogRef<DeleteProductDialog>) {}
}
