import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/core/cart.service';

@Component({
  selector: 'sela-client-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  constructor(private cartSerice: CartService) { }

  ngOnInit() {
  }

  get cartItems() {
    return this.cartSerice.selectedItems;
  }
}
