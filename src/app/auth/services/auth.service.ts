import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IUser } from '../models/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<IUser>('https://dummyjson.com/auth/login', {
      username,
      password,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
