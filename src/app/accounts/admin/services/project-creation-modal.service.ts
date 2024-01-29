import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { BASE_URL } from '../../../../environment/config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetails, GenericResponse } from '../../../shared/types/types';
import { ProjectCreationModalComponent } from '../../../shared/components/modals/project-creation-modal/project-creation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectCreationModalService {
  constructor(
    private http: HttpClient,
    private projectcreationmodalService: NgbModal
  ) {}
  header!: {
    headers: {
      'Content-Type': 'application/json';
      'ngrok-skip-browser-warning': 'skip-browser-warning';
    };
  };
  addNewProject(data: ProjectDetails): Observable<ProjectDetails> {
    return this.http.post<ProjectDetails>(`${BASE_URL}/project/store`, data, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      },
    });
  }
  editProject(data: ProjectDetails): Observable<ProjectDetails> {
    console.log('Editing project with data:', data);
    return this.http.put<ProjectDetails>(`${BASE_URL}/project/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      },
    });
    // .pipe(
    //   catchError(error => {
    //     if (error instanceof HttpErrorResponse && error.status === 400) {
    //       return throwError({
    //         status: 400,
    //         error: { message: 'Invalid request' },
    //       });
    //     }
    //     return throwError(error);
    //   })
    // );
  }

  getProjects(): Observable<ProjectDetails[]> {
    return this.http.get<ProjectDetails[]>(`${BASE_URL}/project/fetch`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      },
    });
    // .pipe(
    //   catchError(error => {
    //     console.error('Error in getClients:', error);
    //     throw error;
    //   })
    // );
  }

  deleteProject(projectId: string): Observable<GenericResponse> {
    const url = `${BASE_URL}/project/archives/store`;
    const params = { projectId: projectId };
    return this.http.delete<GenericResponse>(url, { params: params });
    // .pipe(
    //   tap(response => {
    //     const message = response.message;
    //     console.log('Delete Project API Response:', response);
    //     console.log('Extracted Message:', message);

    //   }),
    //   catchError(error => {
    //     console.error('Error deleting project:', error);
    //     throw error;
    //   })
    // );
  }

  archivedProjectDelete(projectId: string): Observable<GenericResponse> {
    const url = `${BASE_URL}/project/archives/delete`;
    const params = { projectId: projectId };
    return this.http.delete<GenericResponse>(url, { params: params });
  }

  openProjectCreationModal(): NgbModalRef {
    const modalRef = this.projectcreationmodalService.open(
      ProjectCreationModalComponent,
      {
        centered: true,
        backdrop: 'static',
      }
    );

    modalRef.result.finally(() => {});

    return modalRef;
  }
  openEditProjectModal(): NgbModalRef {
    const modalRef = this.projectcreationmodalService.open(
      ProjectCreationModalComponent,
      {
        centered: true,
        backdrop: 'static',
      }
    );

    modalRef.result.finally(() => {});

    return modalRef;
  }
  openDeleteProjectModal(): NgbModalRef {
    const modalRef = this.projectcreationmodalService.open(
      ProjectCreationModalComponent,
      {
        centered: true,
        backdrop: 'static',
      }
    );

    modalRef.result.finally(() => {});

    return modalRef;
  }
}
