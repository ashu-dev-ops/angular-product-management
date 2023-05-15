import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'learning-path-3-assignment';
  constructor(private _auth: AuthService, private _router: Router) {}
  show: any;
  logout() {
    this._auth.show.next(false);

    localStorage.removeItem('angular-user');
    // this._router.navigate(['/login']);
    this._router.navigate(['/login']);
  }
  ngOnInit(): void {
    this._auth.show.subscribe((value) => {
      this.show = value;
      console.log(value);
    });
    // console.log();
  }
}
