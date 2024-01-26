import { Component,  OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,

  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';


import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { ClientCreationModalService } from '../../../../accounts/admin/services/client-creation-modal.service';

@Component({
  selector: 'app-client-creation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './client-creation-modal.component.html',
  styleUrl: './client-creation-modal.component.css'
})
export class ClientCreationModalComponent implements OnInit{
  @Input() isOpen = true;
  formData: FormGroup;
  loading = false;
  success = false;
  error = false;
  errorMessages: { roles?: string; email?: string } = {};

  constructor(
    private router: Router,
    private clientcreationService: ClientCreationModalService,

    private fb: FormBuilder,
    private modalService: NgbModal,

  ){
    this.formData = this.fb.group({
      details: [''],
      name: [''],

    });
  }

  OnCreateClient(){
    this.loading = false;
    this.success = false;
    this.error = false;
    this.errorMessages = {};
    if (this.formData.valid) {
      // this.loading = true;

      this.clientcreationService
        .addNewClient(this.formData.value)
        .pipe(
          finalize(() => {
            // this.loading = false;
          })
        )
        .subscribe(
          response => {
            console.log('Post request successful', response);

            // this.success = true;
          },
          error => {
            console.error('Error in post request', error);

            this.error = true;

            if (error.error && typeof error.error === 'object') {
              this.errorMessages = error.error;
            }
          }
        );
    } else {
      console.error('Form is not valid');
    }
  }
  closeUsercreationModal() {
    this.isOpen = false;

  }
  
  ngOnInit(): void {

  }
}
