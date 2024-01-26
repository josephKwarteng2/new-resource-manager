import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DepartmentService } from '../../../../accounts/admin/services/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-modal',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.css'],
})
export class DepartmentModalComponent implements OnInit {
  @Output() saveDepartment = new EventEmitter<string>();
  @Input() formGroup!: FormGroup;
  @Input() isOpen = true;
  modalForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    private departmentService: DepartmentService
  ) {
    this.modalForm = this.fb.group({
      newDepartment: ['', Validators.required],
    });
  }

  onSaveDepartment() {
    if (this.modalForm.valid) {
      const newDepartment: string = this.modalForm.value.newDepartment;

      this.departmentService.addDepartment(newDepartment).subscribe(
        (response: ResponseType) => {
          console.log('New department added to the backend:', newDepartment);

          this.saveDepartment.emit(newDepartment);
          this.closeModal();
        },
        err => {
          console.error('Error adding department to the backend:', err);
        }
      );
    }
  }
  fetchDepartments() {
    this.departmentService.getDepartments().subscribe(
      (departments: string[]) => {
        console.log('Fetched specializations from the backend:', departments);
      },
      err => {
        console.error('Error fetching specializations from the backend:', err);
      }
    );
  }

  closeModal() {
    this.isOpen = false;
  }
  ngOnInit(): void {}
}
