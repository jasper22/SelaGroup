import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ScrollDispatcher, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { takeWhile, map, filter } from 'rxjs/operators'
import { Product } from '../../services/core/Product';
import { ProductsService } from '../../services/core/products.service';
import { Subject, of, concat, Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/core/cart.service';
import { ProductsStorageService } from '../../services/core/products-storage.service';


@Component({
  selector: 'products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport, {static: false}) virtualScroll: CdkVirtualScrollViewport;

  private currentPage = 0;

  productList: Array<Product[]> = [];

  private autoCompleteWord = '';

  constructor(private scrollDispatcher: ScrollDispatcher, private cd: ChangeDetectorRef,  
              private productStorage:ProductsStorageService, 
              private cartService: CartService) 
  { 
    this.productStorage.allProducts$.subscribe(data => {
      this.productList = this.productList.concat(data);
    })
  }

  ngOnInit() {
    this.productStorage.getNextResults(this.currentPage, this.autoCompleteWord);
  }

  ngAfterViewInit(): void {
    this.scrollDispatcher.scrolled().pipe(
      filter(event => this.virtualScroll.getRenderedRange().end === this.virtualScroll.getDataLength())
    ).subscribe(event => {
      this.currentPage++;
      this.productStorage.getNextResults(this.currentPage, this.autoCompleteWord);
    })
  }

  addToCart(event: MouseEvent, item: Product) : void {
    this.cartService.addToCart(item);
  }
}
