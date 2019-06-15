import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ProductsService } from '../../services/core/products.service';
import { Observable, AsyncSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Product } from '../../services/core/Product';
import { ProductsStorageService } from '../../services/core/products-storage.service';

@Component({
  selector: 'sela-client-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  element: Product;

  constructor(private route: ActivatedRoute, private productStorage: ProductsStorageService) { 
    this.route.params.subscribe(
      params => 
      {
        const productID = params['id'];
        this.element = productStorage.productList[productID];
      }
  );
  }

  ngOnInit() {
    
  }
}
