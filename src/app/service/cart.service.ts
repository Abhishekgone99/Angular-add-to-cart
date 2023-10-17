import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() {}

  // getter method
  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: any) {
    // let count = 1;
    // this.cartItemList.forEach((cartItem: any) => {
    //   if (product.id === cartItem.id) {
    //     cartItem.quantity++;
    //     cartItem.total = cartItem.price * cartItem.quantity;
    //     count = 0;
    //   }
    // });
    // if (count === 1) {
    //   this.cartItemList.push(product);
    // }
    // this.productList.next(this.cartItemList);
    // this.getTotalPrice();

    const existingItem = this.cartItemList.find(
      (cartItem: any) => cartItem.id === product.id
    );
    if (!existingItem) {
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    // this.cartItemList.map((a: any, index: number) => {
    //   if (product.id === a.id) {
    //     this.cartItemList.splice(index, 1);
    //   }
    // });
    debugger;
    this.cartItemList = this.cartItemList.filter((a: any) => {
      product.id !== a.id;
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  increaseQuantity(product: any) {
    const index = this.cartItemList.findIndex((cartItem: any) => {
      return cartItem.id === product.id;
    });

    if (index !== -1) {
      let newItem = { ...this.cartItemList[index] };
      newItem.quantity++;
      newItem.total = newItem.price * newItem.quantity;

      let newList = [...this.cartItemList];
      newList[index] = newItem;

      this.cartItemList = newList;
      this.productList.next(this.cartItemList);
    }
  }

  decreaseQuantity(product: any) {
    const index = this.cartItemList.findIndex((cartItem: any) => {
      return cartItem.id === product.id;
    });
    if (index !== -1 && this.cartItemList[index].quantity > 1) {
      let newItem = { ...this.cartItemList[index] };
      newItem.quantity--;
      newItem.total = newItem.price * newItem.quantity;

      let newList = [...this.cartItemList];
      newList[index] = newItem;

      this.cartItemList = newList;
      this.productList.next(this.cartItemList);
    }
  }

  isItemInCart(product: any): boolean {
    return this.cartItemList.some((cartItem: any) => {
      return cartItem.id === product.id;
    });
  }
}
