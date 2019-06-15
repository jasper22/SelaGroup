import { Injectable } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedItems: Array<Product> = new Array<Product>();

  constructor() { }

  addToCart(item: Product) : void {
    this.selectedItems = this.selectedItems.concat(item);
  }

  removeFromCart(item: Product) : void {
    const index: number = this.selectedItems.indexOf(item);
    this.selectedItems.splice(index,1);
  }
}
