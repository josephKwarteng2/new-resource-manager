import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/authorization/AuthReducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  template: ``,
})
export class RedirectComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    const storeSub = this.store.select(selectCurrentUser).subscribe({
      next: user => {
        if (user) {
          switch (user.roles) {
            case 'Basic User':
              this.router.navigateByUrl('/user/dashboard');
              break;
            case 'Administrator':
              this.router.navigateByUrl('/admin/dashboard');
              break;
            case 'Manager':
              this.router.navigateByUrl('/manager/dashboard');
              break;
            default:
              this.router.navigateByUrl('/login');
          }
        } else {
          this.router.navigateByUrl('/login');
        }
      },
    });

    this.subscriptions.push(storeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
