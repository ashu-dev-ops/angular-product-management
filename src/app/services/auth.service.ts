import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authHttp: HttpClient) {}
  show = new Subject<boolean>();
  baseUrl = '';
  // logIn: boolean = false;
  onSignUp(data: any): Observable<any> {
    return this.authHttp.post(
      'http://localhost:3002/api/v1/auth/register',
      data
    );
  }
  onSignIn(data: any): Observable<any> {
    return this.authHttp.post('http://localhost:3002/api/v1/auth/login', data);
  }
  isloggedin() {
    const a = localStorage.getItem('angular-user');
    if (a) {
      this.show.next(true);
    } else {
      this.show.next(false);
    }

    return a;
  }

  // onSignIn
}
