import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;

  constructor(private Cart: CartService) {}

  ngOnInit(): void {
    this.Cart.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.grandTotal = this.Cart.getTotalPrice();
      },
    });
  }

  removeItem(item: any) {
    this.Cart.removeCartItem(item);
  }

  emptyCart() {
    this.Cart.removeAllCart();
  }

  increaseQuantity(item: any) {
    this.Cart.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.Cart.decreaseQuantity(item);
  }
}
