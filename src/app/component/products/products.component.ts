import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  public searchKey: string = '';
  public errorMsg: any;

  constructor(private Api: ApiService, private Cart: CartService) {}

  ngOnInit(): void {
    this.loadProducts();

    this.Api.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  loadProducts() {
    this.Api.getProducts().subscribe({
      next: (res) => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          if (
            a.category === "women's clothing" ||
            a.category === "men's clothing"
          ) {
            a.category = 'fashion';
          } else if (a.category === 'smartphones' || a.category === 'laptops') {
            a.category = 'electronics';
          }
          Object.assign(a, { quantity: 1, total: a.price });
        });
      },
      error: (error) => (this.errorMsg = error),
    });
  }

  addToCart(item: any) {
    this.Cart.addToCart(item);
  }

  incrQuantity(item: any) {
    this.Cart.increaseQuantity(item);
  }

  decrQuantity(item: any) {
    if (item.quantity == 1) {
      this.Cart.removeCartItem(item);
    } else {
      this.Cart.decreaseQuantity(item);
    }
  }

  removeItem(item: any) {
    debugger;
    this.Cart.removeCartItem(item);
  }

  isItemInCart(item: any) {
    // console.log('isInCart', this.Cart.isItemInCart(item));
    return this.Cart.isItemInCart(item);
  }

  getQuantityInCart(product: any): number {
    const cartItem = this.Cart.cartItemList.find(
      (item: any) => item.id === product.id
    );
    return cartItem ? cartItem.quantity : 0;
  }

  filter(category: any) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category === category || category === '') {
        return a;
      }
    });
  }
}
