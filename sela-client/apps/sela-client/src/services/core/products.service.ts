import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './Product';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(offset:number, word:string) : Observable<Product[]> {

    if (word) {
      return this.httpClient.get<Array<Product>>(`${environment.api.productsList}/${offset}/${word}`);
    }
    else {
      return this.httpClient.get<Array<Product>>(`${environment.api.productsList}/${offset}`);
    }
  }
}
