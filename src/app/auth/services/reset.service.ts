import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendOtp,
  SendOtpResponse,
} from '../types/reset-types';
import { BASE_URL } from '../../../environment/config';

/**
 * @class ResetService
 * @description a service for resetting user password
 *
 * @method postEmail - submits user email to the backend for otp to be sent
 * @param email - object which contains user email
 * @returns observable that emits SendOtpResponse (message, user and otp),
 * @see {@link SendOtpResponse} for more about type definition
 *
 * @method updatePassword - submits user credentials together with updated password to the backend
 * @param credentials - email, password & confirmation, otp
 * @returns an observable that emits ResetPasswordResponse (message, accesstoken and user)
 * @see {@link ResetPasswordResponse} for more about type definition
 */
@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private http: HttpClient) {}

  postEmail(email: SendOtp) {
    return this.http.post<SendOtpResponse>(`${BASE_URL}/users/send-otp`, email);
  }

  updatePassword(credentials: ResetPasswordRequest) {
    return this.http.put<ResetPasswordResponse>(
      `${BASE_URL}/users/update/password`,
      credentials
    );
  }
}
