import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn?: boolean;
  loginSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginSubscription = this.authService.isLoggedIn.subscribe(
      (loginStatus: boolean) => (this.isLoggedIn = loginStatus)
    );
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
