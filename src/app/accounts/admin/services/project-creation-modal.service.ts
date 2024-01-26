import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
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
  addNewProject(data: ProjectDetails): Observable<ProjectDetails> {
    return this.http.post<ProjectDetails>(`${BASE_URL}/project/store`, data);
  }

  getProjects(): Observable<ProjectDetails[]> {
    return this.http
      .get<ProjectDetails[]>(`${BASE_URL}/project/fetch`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
      })
      .pipe(
        catchError(error => {
          console.error('Error in getClients:', error);
          throw error;
        })
      );
  }

  deleteProject(projectCode: string): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(`${BASE_URL}/projects/delete`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      },
      params: {
        projectCode: projectCode,
      },
    });
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
}
