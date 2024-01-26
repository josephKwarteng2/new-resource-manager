import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../../environment/config';
import { AdminUser } from '../../../shared/types/types';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addNewUser(data: AdminUser): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${BASE_URL}/users/store`, data);
  }
}
