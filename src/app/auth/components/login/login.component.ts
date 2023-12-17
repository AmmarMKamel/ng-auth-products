import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
          localStorage.setItem('token', responseData.token);
          this.authService.isLoggedIn.next(true);
        },
        error: (error) => console.log(error),
      });
  }
}
