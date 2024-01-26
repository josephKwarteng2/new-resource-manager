import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../environment/config';
import { LoginUserResponse } from '../types/auth-types';

/**
 * @class CurrentUserService
 * @description a service for refetching an already logged in user
 *
 * @method get - the active user using access token in the interceptors
 * @returns observable that emits LoginUserResponse containing a current user object,
 * @see {@link LoginUserResponse} for more about type definition
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<LoginUserResponse>(
      `${BASE_URL}/users/token/exchange`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
      }
    );
  }
}
