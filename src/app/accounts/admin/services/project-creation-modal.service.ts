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
  ) { }
  header!: {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'skip-browser-warning',
    },
  };
  addNewProject(data: ProjectDetails): Observable<ProjectDetails> {
    return this.http.post<ProjectDetails>(`${BASE_URL}/project/store`, data, this.header);
  }
  editProject(data: ProjectDetails): Observable<ProjectDetails> {
    return this.http.put<ProjectDetails>(`${BASE_URL}/project/update`, data, this.header);
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

  deleteProject(projectId: string): Observable<ProjectDetails> {
    return this.http.delete<ProjectDetails>(`${BASE_URL}/projects/delete`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
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

    modalRef.result.finally(() => { });

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

    modalRef.result.finally(() => { });

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

    modalRef.result.finally(() => { });

    return modalRef;
  
  }
}

