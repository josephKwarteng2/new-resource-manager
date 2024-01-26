import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SpecializationService } from '../../../../accounts/admin/services/specialization.service';
import { CommonModule } from '@angular/common';
import { GenericResponse } from '../../../types/types';

@Component({
  selector: 'app-specialization-modal',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './specialization-modal.component.html',
  styleUrls: ['./specialization-modal.component.css'],
})
export class SpecializationModalComponent implements OnInit {
  @Output() saveSpecialization = new EventEmitter<string>();
  @Input() formGroup!: FormGroup;
  @Input() isOpen = true;
  modalForm: FormGroup;
  specializationStoringError: string = '';

  constructor(
    private fb: FormBuilder,

    private specializationService: SpecializationService
  ) {
    this.modalForm = this.fb.group({
      newSpecialization: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSaveSpecialization() {
    if (this.modalForm.valid) {
      const newSpecialization = this.modalForm.value.newSpecialization;

      this.specializationService
        .addSpecialization(newSpecialization)
        .subscribe({
          next: () => {
            this.saveSpecialization.emit(newSpecialization);
            this.closeModal();
          },
          error: err => {
            this.handleSpecializationStoringError(err);
          },
        });
    }
  }
  clearErrorMessagesAfterDelay() {
    setTimeout(() => {
      this.specializationStoringError= '';
    }, 3000); 
  }

  private handleSpecializationStoringError(error: GenericResponse) {

 
    if (error.status === 404) {
      
      this.specializationStoringError = 'Unable to save new specialization';
    } else {
      
      this.specializationStoringError = 'Please try again or contact IT support';
    }
    this.clearErrorMessagesAfterDelay();
  }

  fetchSpecializations() {
    this.specializationService.getSpecializations().subscribe({
      next: (specializations: string[]) => {

      },
      error: err => {
      },
      complete: () => {},
    });
  }

  closeModal() {
    this.isOpen = false;
  }
}
