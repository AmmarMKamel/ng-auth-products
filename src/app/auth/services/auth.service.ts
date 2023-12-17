import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<IUser>('https://dummyjson.com/auth/login', {
      username,
      password,
    });
  }
}
