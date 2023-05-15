import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _productHttp: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this._productHttp.get('http://localhost:3002/api/v1/product/');
  }
  deleteProduct(id: string): Observable<any> {
    return this._productHttp.delete(
      `http://localhost:3002/api/v1/product/${id}`
    );
  }
  getProduct(id: string) {
    return this._productHttp.get(`http://localhost:3002/api/v1/product/${id}`);
  }
  updateProduct(id: string, data: any) {
    return this._productHttp.patch(
      `http://localhost:3002/api/v1/product/${id}`,
      data
    );
  }
  addProduct(data: any): Observable<any> {
    return this._productHttp.post(
      `http://localhost:3002/api/v1/product/`,
      data
    );
  }
}
