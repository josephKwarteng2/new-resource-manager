import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecializationService } from '../../../../accounts/admin/services/specialization.service';
//import { SpecializationResponse } from '../reponse.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { specializationResponse } from '../../../../accounts/admin/interfaces';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,

    private specializationService: SpecializationService
  ) {
    this.modalForm = this.fb.group({
      newSpecialization: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave() {
    if (this.modalForm.valid) {
      const newSpecialization = this.modalForm.value.newSpecialization;

      this.specializationService
        .addSpecialization(newSpecialization)
        .subscribe({
          next: () => {
            console.log(
              'New specialization added to the backend:',
              newSpecialization
            );
            this.saveSpecialization.emit(newSpecialization);
            this.closeModal();
          },
          error: err => {
            console.error('Error adding specialization to the backend:', err);
          },
        });
    }
  }
  fetchSpecializations() {
    this.specializationService.getSpecializations().subscribe({
      next: (specializations: string[]) => {
        console.log(
          'Fetched specializations from the backend:',
          specializations
        );
      },
      error: err => {
        console.error('Error fetching specializations from the backend:', err);
      },
      complete: () => {},
    });
  }

  closeModal() {}
}
