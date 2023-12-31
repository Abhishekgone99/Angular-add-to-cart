import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItems: number = 0;
  public searchTerm: string = '';
  constructor(private cart: CartService, private Api: ApiService) {}

  ngOnInit(): void {
    this.cart.getProducts().subscribe({
      next: (res) => (this.totalItems = res.length),
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.Api.search.next(this.searchTerm);
  }
}
