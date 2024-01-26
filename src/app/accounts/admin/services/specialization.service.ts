// specialization.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from '../../../../environment/config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpecializationModalComponent } from '../../../shared/components/modals/specialization-modal/specialization-modal.component';

import { HttpClient } from '@angular/common/http';
import { specializationResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
   private _specializations: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  specializations$ = this._specializations.asObservable();

  constructor(private http: HttpClient, private specializationService: NgbModal) {
    this._specializations.next([]);
  }

  openSpecializationModal(): NgbModalRef {

    const modalRef = this.specializationService.open(SpecializationModalComponent, {
      centered: true,
      backdrop: 'static', 

    });
    
    modalRef.result.finally(() => {
     
    });

    return modalRef;


  }
    
  

  addSpecialization(specialization: string): Observable<specializationResponse> {
    const currentSpecializations = this._specializations.getValue();

    return this.http
      .post<any>(`${BASE_URL}/specialization/store`, { name: specialization })
      .pipe(
        catchError(error => {
          
          console.error('Error adding specialization to the backend:', error);
          
          this._specializations.next(currentSpecializations);

          return throwError(error);
        })
      );
  }

  getSpecializations(): Observable<string[]> {
    return this.http
      .get<string[]>(`${BASE_URL}/specialization/fetch`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
      })

      .pipe(
        catchError(error => {
          console.error('Error fetching specializations:', error);
          return throwError(error); 
        })
      );
  }

  setSpecializations(specializations: string[]) {
    this._specializations.next(specializations);
  }
}
