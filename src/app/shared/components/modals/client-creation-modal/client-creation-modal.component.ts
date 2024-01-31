import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,

  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { ClientCreationModalService } from '../../../../accounts/admin/services/client-creation-modal.service';
import { ClientDetails } from '../../../types/types';
import { ProjectCreationModalComponent } from '../project-creation-modal/project-creation-modal.component';

@Component({
  selector: 'app-client-creation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProjectCreationModalComponent],
  templateUrl: './client-creation-modal.component.html',
  styleUrl: './client-creation-modal.component.css'
})
export class ClientCreationModalComponent implements OnInit {
  @Input() isOpen = true;
  @Output() clientCreated: EventEmitter<ClientDetails> = new EventEmitter()



  formData: FormGroup;
  loading = false;
  success = false;
  error = false;
  errorMessage: string = '';
  successMessage: string = '';
  nullFormControlMessage: string = '';
  formInvalidMessage: string = '';

  constructor(

    private clientcreationService: ClientCreationModalService,

    private fb: FormBuilder,



  ) {
    this.formData = this.fb.group({
      details: [''],
      name: [''],

    });
  }

  clearErrorMessagesAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
      this.formInvalidMessage = '';
      this.nullFormControlMessage = '';
    }, 3000);
  }

  onCreateClient() {
    this.loading = false;
    this.success = false;
    this.error = false;

    if (this.formData.valid) {
      this.loading = true;

      this.clientcreationService
        .addNewClient(this.formData.value)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          updatedClients => {
            this.success = true;
            this.successMessage = 'Client created successfully!';
            this.clientCreated.emit(updatedClients.client);
            this.formData.reset();
          },
          error => {
            this.error = true;
            if (error.status === 400) {
              this.errorMessage = 'Invalid inputs, please check your inputs and try again';
            } else if (error.status === 401) {
              this.errorMessage = 'Unauthorized. Please log in as an Admin or Manager.';
            } else if (error.status === 403) {
              this.errorMessage = 'You do not have the necessary permission to perform this task.';
            } else if (error.status === 404) {
              this.errorMessage = 'Resource not found, please contact IT support.';
            } else if (error.status >= 500) {
              this.errorMessage = 'Server error. Please try again later.';
            } else {
              this.errorMessage = 'An error occurred. Please try again.';
            }
            this.clearErrorMessagesAfterDelay();
          }
        );
    } else {
      this.formInvalidMessage = 'Please complete the form or enter valid inputs';
      this.clearErrorMessagesAfterDelay();
    }
  }



  closeClientcreationModal() {
    this.isOpen = false;

  }

  ngOnInit(): void {

  }
}
