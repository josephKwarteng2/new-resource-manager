import { Injectable } from '@angular/core';
import { User } from '../../../shared/types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../../environment/config';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/users/store`, user);
  }
}
