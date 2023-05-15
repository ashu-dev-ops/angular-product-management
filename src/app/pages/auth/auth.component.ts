import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  authForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.authForm = this._fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    console.log(this.authForm.value);
    this._auth.onSignUp(this.authForm.value).subscribe({
      next: (value: any) => {
        localStorage.setItem('angular-user', JSON.stringify(value));
        // this._auth.logIn = true;
        this._router.navigate(['/dashboard']);
      },
      error: (err) => console.log(err),
    });
  }
}
