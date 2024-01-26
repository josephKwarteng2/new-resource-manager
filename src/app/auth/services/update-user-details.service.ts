import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../environment/config';
import {
  UpdateUserDetails,
  UpdateUserDetailsResponse,
} from '../types/auth-types';

/**
 * @class UpdateUserDetailsService
 * @description a service for updating user details
 *
 * @method post - submits updated user details to the backend
 * @param details - fields like email, profile picture and phone number
 * @returns an observable that emits UpdateUserResponse,
 * @see {@link UpdateUserDetailsResponse} for more about type definition
 *
 * @usageNotes
 * ```
 * const updateUserDetailsService = inject(UpdateUserDetailsService);
 * updateUserDetailsservice.post({
 *  email: "john@gmail.com",
 *  phoneNumber: 501234567345
 * })
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class UpdateUserDetailsService {
  constructor(private http: HttpClient) {}

  post(details: UpdateUserDetails) {
    return this.http.post<UpdateUserDetailsResponse>(
      `${BASE_URL}/users/account/setup`,
      details
    );
  }
}
