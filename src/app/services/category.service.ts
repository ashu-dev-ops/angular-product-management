import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private catHttp: HttpClient) {}
  getAllCategory(): Observable<any> {
    return this.catHttp.get('http://localhost:3002/api/v1/category/');
  }
  createCategory(value: any) {
    return this.catHttp.post('http://localhost:3002/api/v1/category/', value);
  }
  deleteCategory(value: any) {
    return this.catHttp.delete(
      `http://localhost:3002/api/v1/category/${value._id}`,
      value
    );
  }
  updateCategory(value: any, id: any) {
    console.log(value);
    console.log(id);
    for (const pair of value.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    return this.catHttp.patch(
      `http://localhost:3002/api/v1/category/${id}`,
      value
    );
  }
}
