import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../../environment/config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addNew(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/users/store`, data);
  }
}
