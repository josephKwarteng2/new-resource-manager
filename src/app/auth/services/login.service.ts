import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUserDetails, LoginUserResponse } from '../types/auth-types';
import { BASE_URL } from '../../../environment/config';

/**
 * @class LoginService
 * @description a service for logging in users
 *
 * @method post - submits user details to the backend
 * @param LoginUserDetails - email and password
 * @returns an observable that emits LoginUserResponse,
 * @see {@link LoginUserResponse} for more about type definition
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  post(user: LoginUserDetails) {
    return this.http.post<LoginUserResponse>(`${BASE_URL}/users/login`, user);
  }
}
