import { Injectable } from '@angular/core';
import {
  UpdateUserPasswordDetails,
  UpdateUserPasswordResponse,
} from '../types/auth-types';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../environment/config';

/**
 * @class UpdatePasswordService
 * @description a service for updating user initial password
 *
 * @method postUser - submits user new user password to the backend
 * @param credentials - password and confirm_password
 * @returns an observable that emits UpdateUserPasswordResponse same as LoginUserReponse,
 * @see {@link UpdateUserPasswordResponse} for more about type definition
 *
 * @method postAdmin - submits admin updated password to the packend
 * @param credentials - email, old_pasword and password
 */
@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  constructor(private http: HttpClient) {}

  postUser(credentials: UpdateUserPasswordDetails) {
    return this.http.post<UpdateUserPasswordResponse>(
      `${BASE_URL}/users/set/new/password`,
      credentials
    );
  }

  postAdmin(credentials: UpdateUserPasswordDetails & { email: string }) {
    return this.http.put<{ message: string; status: number }>(
      `${BASE_URL}/users/update/initial/password`,
      credentials
    );
  }
}
