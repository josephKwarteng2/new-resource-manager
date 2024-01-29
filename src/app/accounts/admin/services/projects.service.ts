import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../environment/config';
import { Observable } from 'rxjs';
import { ProjectDetails, Projects } from '../../../shared/types/types';
import { GenericResponse } from '../../../shared/types/types';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  fetchProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`${BASE_URL}/project/fetch`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      },
    });
  }

  archiveProject(projectId: string): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(
      `${BASE_URL}/project/archives/store`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
        params: {
          projectId: projectId,
        },
      }
    );
  }

  archivedProjects(): Observable<ProjectDetails[]> {
    return this.http.get<ProjectDetails[]>(
      `${BASE_URL}/project/archives/fetch`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
      }
    );
  }

  restoreProject(projectId: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${BASE_URL}/project/archives/restore`,
      { projectId }
    );
  }

  deleteProject(projectId: string): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(
      `${BASE_URL}/project/archives/delete`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
        params: {
          projectId: projectId,
        },
      }
    );
  }
}
