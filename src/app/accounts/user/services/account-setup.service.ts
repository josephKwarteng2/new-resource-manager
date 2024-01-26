import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SetupProgress = 'password' | 'details';

/**
 * @class AccountSetupService
 *
 * @description
 * A service for managing account setup on first login. Toggles between different states
 * of a setup: "set new password" and "user details".
 *
 * @example
 * ```
 *  const accountSetupService = inject(AccountSetupService);
 *  accountSetupService.toggle("password"); //switches the field to a password field
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class AccountSetupService {
  /**
   * @property dataSource - A BehaviorSubject that holds the
   * current state of the setup progress.
   */
  private dataSource = new BehaviorSubject<SetupProgress>('password');

  /**
   * @property data - An Observable derived from dataSource.
   * Use this to subscribe to changes in the setup progress.
   */
  data = this.dataSource.asObservable();

  constructor() {}

  /**
   * @method toggle - Changes the state of the setup progress.
   * @param {SetupProgress} data
   */
  toggle(data: SetupProgress) {
    this.dataSource.next(data);
  }
}
