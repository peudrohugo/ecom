import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Product } from '../entities/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  listProducts(): Observable<any> {
    const url = `${environment.API_URL}/products`;
    return this.http.get(url, { observe: 'response' });
  }

  getProduct(productId: number): Observable<any> {
    const url = `${environment.API_URL}/products/${productId}`;
    return this.http.get(url, { observe: 'response' });
  }

  createProduct(productObj: Product): Observable<any> {
    const url = `${environment.API_URL}/products`;
    return this.http.post(url, productObj, { observe: 'response' });
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${environment.API_URL}/products/delete/${productId}`;
    return this.http.delete(url, { observe: 'response' });
  }

  updateProduct(productId: number, productToEdit: Product): Observable<any> {
    const url = `${environment.API_URL}/products/update/${productId}`;
    return this.http.put(url, productToEdit, { observe: 'response' });
  }
}
