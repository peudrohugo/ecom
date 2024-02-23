import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { Product } from '../shared/entities/product';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

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
    private snackBar: MatSnackBar,
    private readonly router: Router
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

  edit(id: number): void {
    this.router.navigate(['/', 'products', 'edit-product', `${id}`]);
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remover produto?',
        message: 'Tem certeza que deseja excluir esse produto?',
      },
    });

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
