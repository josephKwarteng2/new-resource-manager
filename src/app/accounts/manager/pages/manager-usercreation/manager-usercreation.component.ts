import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../admin/services/admin.service';
import { SpecializationService } from '../../../admin/services/specialization.service';
import { SpecializationModalComponent } from '../../../../shared/components/modals/specialization-modal/specialization-modal.component';
import { DepartmentModalComponent } from '../../../../shared/components/modals/department-modal/department-modal.component';
import { DepartmentService } from '../../../admin/services/department.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-manager-usercreation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpecializationModalComponent,
    // SpecializationModalComponent,
    DepartmentModalComponent,
  ],
  templateUrl: './manager-usercreation.component.html',
  styleUrl: './manager-usercreation.component.css',
})
export class ManagerUsercreationComponent implements OnInit {
  @Input() isOpen = true;

  specializationModalOpen = false;
  departmentModalOpen = false;

  formData: FormGroup;
  loading = false;
  success = false;
  error = false;
  errorMessages: { roles?: string; email?: string } = {};
  selectedDepartment: string = '';
  selectedSpecialization: string = '';
  selectedRoles: string = '';

  specializationDropdownOpen = false;
  rolesDropdownOpen = false;
  departmentDropdownOpen = false;
  specializations: string[] = [];
  department: string[] = [];
  roles: string[] = [];

  constructor(
    private router: Router,
    private adminService: AdminService,
    private specializationService: SpecializationService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private departmentService: DepartmentService
  ) {
    this.formData = this.fb.group({
      roles: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: [''],
      department: [''],
      role: [''],
      skills: [''],
    });

    this.specializationService.specializations$.subscribe(
      (specializations: string[]) => {
        this.specializations = specializations;
      }
    );

    this.departmentService.departments$.subscribe((departments: string[]) => {
      this.department = departments;
    });
  }

  SpecializationDropdown() {
    this.specializationDropdownOpen = false;
  }
  DepartmentDropdown() {
    this.departmentDropdownOpen = false;
  }
  RolesDropdown() {
    this.rolesDropdownOpen = false;
  }

  selectDepartment(department: string) {
    const departmentControl = this.formData.get('department');
    if (departmentControl) {
      departmentControl.setValue(department);
      this.selectedDepartment = department;
      this.DepartmentDropdown();
    }
  }
  selectRole(role: string) {
    const rolesControl = this.formData.get('roles');
    if (rolesControl) {
      rolesControl.setValue(role);
      this.selectedRoles = role;
      this.RolesDropdown();
    }
  }

  toggleSpecializationDropdown() {
    this.specializationDropdownOpen = !this.specializationDropdownOpen;
  }
  toggleDepartmentDropdown() {
    this.departmentDropdownOpen = !this.departmentDropdownOpen;
  }
  toggleRolesDropdown() {
    this.rolesDropdownOpen = !this.rolesDropdownOpen;
  }

  selectOption(option: string) {
    console.log('Selected Option:', option);
    this.SpecializationDropdown();
    this.DepartmentDropdown();
    this.RolesDropdown();
  }

  selectSpecialization(specialization: string) {
    const specializationControl = this.formData.get('specialization');
    if (specializationControl) {
      specializationControl.setValue(specialization);
      this.selectedSpecialization = specialization;
      this.SpecializationDropdown();
    }
  }

  onSpecializationChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'add_new_specialization') {
      this.openSpecializationModal();
    }
  }

  openSpecializationModal() {
    this.specializationModalOpen = true;
  }

  handleAddSpecialization(newSpecializationEvent: string) {
    if (typeof newSpecializationEvent === 'string') {
      const newSpecialization = newSpecializationEvent;
      this.updateSpecializationDropdown(newSpecialization);
      this.fetchSpecializations();
    }
  }

  updateSpecializationDropdown(newSpecialization: string) {
    const specializationControl = this.formData.get('specialization');

    if (specializationControl) {
      const updatedSpecializations = [
        ...this.specializations,
        newSpecialization,
      ];
      this.specializationService.setSpecializations(updatedSpecializations);
      specializationControl.setValue(newSpecialization);
    } else {
      console.error('Specialization control is null');
    }
  }
  private fetchSpecializations() {
    this.specializationService.getSpecializations().subscribe(
      (specializations: string[]) => {
        console.log(
          'Fetched specializations from the backend:',
          specializations
        );
      },
      err => {
        console.error('Error fetching specializations from the backend:', err);
      }
    );
  }

  onDepartmentChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'add_new_department') {
      this.openDepartmentModal();
    }
  }
  openDepartmentModal() {
    this.departmentModalOpen = true;
  }
  handleAddDepartment(newDepartmentEvent: string) {
    if (typeof newDepartmentEvent === 'string') {
      const newDepartment = newDepartmentEvent;

      this.updateDepartmentDropdown(newDepartment);

      this.fetchDepartments();
    }
  }

  updateDepartmentDropdown(newDepartment: string) {
    const departmentControl = this.formData.get('department');
    if (departmentControl) {
      const updatedDepartments = [...this.department, newDepartment];
      this.departmentService.setDepartments(updatedDepartments);
      departmentControl.setValue(newDepartment);
    } else {
      console.error('Department control is null');
    }
  }

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe(
      (departments: string[]) => {
        console.log('Fetched departments from the backend:', departments);
      },
      err => {
        console.error('Error fetching departments from the backend:', err);
      }
    );
  }

  onUserCreate() {
    this.loading = false;
    this.success = false;
    this.error = false;
    this.errorMessages = {};

    if (this.formData.valid) {
      this.loading = true;

      this.adminService
        .addNew(this.formData.value)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          response => {
            console.log('Post request successful', response);

            this.success = true;
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
  closeManagerUsercreationModal() {
    this.isOpen = false;
  }

  exitPage() {
    this.router.navigate(['/admin/dashboard']);
  }

  ngOnInit(): void {}
}
