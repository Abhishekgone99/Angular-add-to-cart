import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable, BehaviorSubject } from 'rxjs';
import { Iproduct } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public _url = 'assets/data/products.json';
  public search = new BehaviorSubject<string>('');

  getProducts(): Observable<Iproduct[]> {
    return this.http
      .get<Iproduct[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }

  // getProducts() {
  //   return this.http
  //     .get<any>(this._url)
  //     .pipe(
  //       map((res: any) => {
  //         return res;
  //       })
  //     )
  //     .pipe(catchError(this.errorHandler));
  // }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.statusText));
  }
}
