import { Injectable } from '@angular/core';
import { Product } from './Product';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {

  productList: Array<Product> = [];

  allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  
  constructor(private productService: ProductsService,) { }

  getNextResults(offsetIndex: number, word:string) : Observable<Product[]> {
    this.productService.getProducts(offsetIndex, word).subscribe(
      data => {
        this.productList = this.productList.concat(data);
        this.allProducts$.next(data);
        // this.cd.detectChanges();
    },
    error => {
      console.error(error);
    })

    return this.allProducts$;
  }
}
