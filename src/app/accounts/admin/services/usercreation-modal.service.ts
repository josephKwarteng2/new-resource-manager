import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsercreationComponent } from '../pages/usercreation/usercreation.component';

@Injectable({
  providedIn: 'root'
})
export class UsercreationModalService {

  constructor(private usercreationmodalService: NgbModal) {}

  openUserCreationModal(): NgbModalRef {

    const modalRef = this.usercreationmodalService.open(UsercreationComponent, {
      centered: true,
      backdrop: 'static', 

    });
    
    modalRef.result.finally(() => {
     
    });

    return modalRef;


  }
}