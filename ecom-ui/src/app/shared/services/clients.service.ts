import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Client } from '../entities/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  listClients(): Observable<any> {
    const url = `${environment.API_URL}/clients`;
    return this.http.get(url, { observe: 'response' });
  }

  getProduct(clientId: string): Observable<any> {
    const url = `${environment.API_URL}/clients/${clientId}`;
    return this.http.get(url, { observe: 'response' });
  }

  createProduct(clientObj: Client): Observable<any> {
    const url = `${environment.API_URL}/clients`;
    return this.http.post(url, clientObj, { observe: 'response' });
  }
}
