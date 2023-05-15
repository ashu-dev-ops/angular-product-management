import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.authForm = this._fb.group({
      // username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    console.log(this.authForm.value);
    this._auth.onSignIn(this.authForm.value).subscribe({
      next: (val: any) => {
        localStorage.setItem('angular-user', JSON.stringify(val));
        // this._auth.logIn = true;
        this._auth.show.next(true);
        this._router.navigate(['/dashboard']);
      },
    });
  }
}
