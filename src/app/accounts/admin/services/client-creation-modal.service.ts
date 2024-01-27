import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BASE_URL } from '../../../../environment/config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClientDetails, GenericResponse } from '../../../shared/types/types';
import { ClientCreationModalComponent } from '../../../shared/components/modals/client-creation-modal/client-creation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ClientCreationModalService {
  constructor(
    private http: HttpClient,
    private clientcreationmodalService: NgbModal
  ) {}
  clientCreated: EventEmitter<ClientDetails> =
    new EventEmitter<ClientDetails>();

  addNewClient(data: ClientDetails): Observable<ClientDetails> {
    return this.http.post<ClientDetails>(`${BASE_URL}/client/store`, data);
  }

  getClients(): Observable<{ clients: ClientDetails[] }> {
    return this.http
      .get<{ clients: ClientDetails[] }>(`${BASE_URL}/client/fetch`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
      })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  archiveClient(clientId: string): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(
      `${BASE_URL}/client/archives/store`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
        params: {
          clientId,
        },
      }
    );
  }

  archivedClients(): Observable<ClientDetails[]> {
    return this.http.get<ClientDetails[]>(`${BASE_URL}/client/archives/fetch`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'skip-browser-warning',
      },
    });
  }

  restoreClient(clientId: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${BASE_URL}/client/archives/restore`,
      { clientId }
    );
  }

  openClientCreationModal(): NgbModalRef {
    const modalRef = this.clientcreationmodalService.open(
      ClientCreationModalComponent,
      {
        centered: true,
        backdrop: 'static',
      }
    );

    modalRef.result.finally(() => {});

    return modalRef;
  }
}
