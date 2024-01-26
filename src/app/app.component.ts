import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AccesstokenService } from './shared/services/accesstoken.service';
import { CurrentUserService } from './auth/services/current-user.service';
import { AuthActions } from './auth/store/authorization/AuthActions';
import { Store } from '@ngrx/store';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OverlayModule, CdkMenuModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private tokenService: AccesstokenService,
    private store: Store,
    private router: Router
  ) {
    window.addEventListener('beforeunload', () => {
      tokenService.set(this.router.url, 'lastRoute');
    });
  }

  ngOnInit(): void {
    const token = this.tokenService.get();
    if (token) {
      this.store.dispatch(AuthActions.fetchCurrentUser());
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', () => {
      this.tokenService.set('lastRoute', this.router.url);
    });
  }
}
