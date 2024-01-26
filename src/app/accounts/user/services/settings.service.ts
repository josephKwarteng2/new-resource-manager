import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import {
  UpdateUserDetailsResponse,
  UpdateUserPasswordResponse,
} from '../../../auth/types/auth-types';
import { BASE_URL } from '../../../../environment/config';
import { UpdateUserDetails } from '../../../auth/types/auth-types';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import {
  Departments,
  Specializations,
  Skills,
} from '../../../shared/types/types';
import { GenericResponse, SkillData } from '../../../shared/types/types';

export type SettingsFields = 'profile' | 'password' | 'work specialization';

/**
 * Service for managing user settings.
 * @example
 * ```
 *  const settingsService = inject(SettingsService);
 *  settingsService.toggle('password'); //to change the field to a password field
 *  settingsService.updateDetails(newDetails); //to update the user details
 *  settingsService.updatePassword(newPassword); //to update the user password
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private dataSource = new BehaviorSubject<SettingsFields>('profile');
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Toggles the settings data to profile or password.
   * @param data The new settings data.
   */
  toggle(data: SettingsFields) {
    this.dataSource.next(data);
  }

  /**
   * Updates the user details on their profile.
   * @param newDetails The new user details.
   * @returns An observable of @see{@link UpdateUserDetailsResponse}
   */
  updateDetails(
    newDetails: UpdateUserDetails
  ): Observable<UpdateUserDetailsResponse> {
    return this.http
      .put<UpdateUserDetailsResponse>(
        `${BASE_URL}/users/settings/update/profile`,
        newDetails
      )
      .pipe(catchError((error: HttpErrorResponse) => this.onError(error)));
  }

  /**
   * Updates the user password.
   * @param newPassword The new user password.
   * @returns An observable of @see{@link UpdateUserPasswordResponse}
   */
  updatePassword(newPassword: string): Observable<UpdateUserPasswordResponse> {
    return this.http
      .put<UpdateUserPasswordResponse>(
        `${BASE_URL}/users/settings/update/password`,
        newPassword
      )
      .pipe(catchError((error: HttpErrorResponse) => this.onError(error)));
  }

  updateAdminSpecialization(
    userSpecializationForm: UpdateUserDetails
  ): Observable<UpdateUserDetailsResponse> {
    return this.http
      .put<UpdateUserDetailsResponse>(
        `${BASE_URL}/users/settings/admin/update/work/specialization`,
        userSpecializationForm
      )
      .pipe(catchError((error: HttpErrorResponse) => this.onError(error)));
  }
  /**
   * Gets available specializations for display purposes
   * @returns An observable of @see{@link Specializations}
   */
  getSpecializations(): Observable<Specializations[]> {
    return this.http
      .get<{ specializations: [{ id: number; name: Specializations }] }>(
        `${BASE_URL}/specialization/fetch`,
        this.headers
      )
      .pipe(
        map(res => {
          const temp: Specializations[] = [];
          res.specializations.forEach(spec => temp.push(spec.name));
          return temp;
        }),
        catchError((error: HttpErrorResponse) => this.onError(error))
      );
  }

  getUserSkills(): Observable<Skills[]> {
    return this.http
      .get<{ skills: [{ id: number; name: Skills }] }>(
        `${BASE_URL}/skills/fetch`,
        this.headers
      )
      .pipe(
        map(res => {
          const temp: Skills[] = [];
          res.skills.forEach(skill => temp.push(skill.name));
          return temp;
        }),
        catchError((error: HttpErrorResponse) => this.onError(error))
      );
  }
  /**
   * Gets available departments for display purposes
   * @returns An observable of @see{@link Departments}
   */
  getDepartments(): Observable<Departments[]> {
    return this.http
      .get<{ departments: [{ id: number; name: Departments }] }>(
        `${BASE_URL}/department/fetch`,
        this.headers
      )
      .pipe(
        map(res => {
          const temp: Departments[] = [];
          res.departments.forEach(dep => temp.push(dep.name));
          return temp;
        }),
        catchError((error: HttpErrorResponse) => this.onError(error))
      );
  }

  addSkill(skillData: SkillData): Observable<GenericResponse> {
    return this.http
      .post<GenericResponse>(`${BASE_URL}/store`, skillData, this.headers)
      .pipe(catchError((error: HttpErrorResponse) => this.onError(error)));
  }

  /**
   * Returns standard headers like ngrok skip warnings and content type
   * @returns {HttpHeaders}
   */
  private get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      }),
    };
  }

  /**
   * Handles the HTTP error response.
   * @param error The HTTP error response.
   * @returns An observable of the error.
   */
  private onError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(error.error);
      return throwError(
        () => new Error('Cannot connect to the server please try again')
      );
    } else {
      console.error(error.error);
      return throwError(() => new Error(`${error.error.message}`));
    }
  }
}
