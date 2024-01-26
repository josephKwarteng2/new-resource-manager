import { Injectable } from '@angular/core';
import { User } from '../../../shared/types/types';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ManagerUsercreationComponent } from '../../manager/pages/manager-usercreation/manager-usercreation.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../../environment/config';

@Injectable({
  providedIn: 'root',
})
export class ManagerUsercreationService {
  constructor(private http: HttpClient, private managerusercreationmodalService: NgbModal) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/users/store`, user);
  }
  
  openManagerUserCreationModal(): NgbModalRef {


    const modalRef = this.managerusercreationmodalService.open(ManagerUsercreationComponent, {
      centered: true,
      backdrop: 'static', 

    });
    
    modalRef.result.finally(() => {

    });

    return modalRef;


  }
}



