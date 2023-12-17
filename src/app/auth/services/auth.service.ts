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
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<IUser>('https://dummyjson.com/auth/login', {
      username,
      password,
      expiresInMins: 60,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 3600 * 1000);
  }
}
