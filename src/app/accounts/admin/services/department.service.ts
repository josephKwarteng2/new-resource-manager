// department.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../environment/config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentModalComponent } from '../../../shared/components/modals/department-modal/department-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private _departments: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  departments$ = this._departments.asObservable();

  constructor(private http: HttpClient, private departmentService: NgbModal) {
    this._departments.next([]);
  }

  openDepartmentModal(): NgbModalRef {

    const modalRef = this.departmentService.open(DepartmentModalComponent, {
      centered: true,
      backdrop: 'static', 

    });
    
    modalRef.result.finally(() => {
     
    });

    return modalRef;


  }

  addDepartment(department: string): Observable<any> {
    const currentDepartments = this._departments.getValue();
    // const updatedDepartments = [...currentDepartments, department];
    // console.log('Updated Departments:', updatedDepartments);
    // this._departments.next(updatedDepartments);

    return this.http
      .post<any>(`${BASE_URL}/department/store`, { name: department })
      .pipe(
        catchError(error => {
          console.error('Error adding department to the backend:', error);
          this._departments.next(currentDepartments);
          return throwError(error);
        })
      );
  }

  getDepartments(): Observable<string[]> {
    return this.http
      .get<string[]>(`${BASE_URL}/department/fetch`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
        },
      })
      .pipe(
        catchError(error => {
          console.error('Error fetching departments:', error);
          return throwError(error);
        })
      );
  }

  setDepartments(departments: string[]) {
    this._departments.next(departments);
  }
}
