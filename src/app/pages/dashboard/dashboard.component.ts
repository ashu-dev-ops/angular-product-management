import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // private _router: Router;

  constructor(private _auth: AuthService, private _router: Router) {
    this._router = _router;
  }

  logout() {
    localStorage.removeItem('angular-user');
    // this._router.navigate(['/login']);
    this._router.navigate(['/login']);
  }
}
