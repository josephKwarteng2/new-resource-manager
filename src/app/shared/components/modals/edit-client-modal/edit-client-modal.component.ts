import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-edit-client-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProjectCreationModalComponent],
  templateUrl: './edit-client-modal.component.html',
  styleUrl: './edit-client-modal.component.css'
})
export class EditClientModalComponent implements OnInit, OnChanges {
  @Input() isOpen = true;
  @Input() client!: ClientDetails;
  @Output() clientEdited: EventEmitter<ClientDetails> = new EventEmitter()

  formData: FormGroup;
  loading = false;
  success = false;
  error = false;
  errorMessage: string = '';
  successMessage: string = '';
  nullFormControlMessage: string = '';
  formInvalidMessage: string = '';

  constructor(

    private clienteditingService: ClientCreationModalService,

    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,



  ) {
    this.formData = this.fb.group({
      details: [''],
      name: [''],
      clientId: [''],

    });
  }

  clearErrorMessagesAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
      this.formInvalidMessage = '';
      this.nullFormControlMessage = '';
    }, 3000);
  }

  onEditClient() {
    this.loading = false;
    this.success = false;
    this.error = false;

    if (this.formData.valid) {
      this.loading = true;

      this.clienteditingService
        .editClient(this.formData.value)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          updatedClients => {
            this.success = true;
            this.successMessage = 'Client Edited successfully!';
            this.clientEdited.emit();
            this.closeClientEditModal

          },
          error => {
            this.error = true;
            if (error.status >= 500) {
              this.errorMessage =
                'Server Error" Something went wrong on the server.';
            } else {
              if (error.error && error.error.message) {
                this.errorMessage = error.error.message;
              } else {
                this.errorMessage = 'An unexpected error occured.';
              }
            }
            this.clearErrorMessagesAfterDelay();
          }
        );
    } else {
      this.formInvalidMessage = 'Please complete the form or enter valid inputs';
      this.clearErrorMessagesAfterDelay();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']) {
      this.populateForm();
    }
  }


  populateForm(): void {
    console.log('Before patchValue - Client:', this.client);
    if (this.client) {
      this.formData.patchValue({
        details: this.client.details,
        name: this.client.name,
        clientId: this.client.clientId
      });
    }
    console.log('After patchValue:', this.formData.value);
  }



  closeClientEditModal() {
    this.isOpen = false;

  }

  ngOnInit(): void {
  this.populateForm();
  
  }

}
