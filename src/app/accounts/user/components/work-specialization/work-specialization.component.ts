import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { selectCurrentUser } from '../../../../auth/store/authorization/AuthReducers';
import {
  CurrentUser,
  Departments,
  InitialSig,
  Specializations,
  Skills,
} from '../../../../shared/types/types';

@Component({
  selector: 'work-specialization',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-specialization.component.html',
  styleUrls: [
    './work-specialization.component.css',
    '../../pages/setting/setting.component.css',
  ],
})
export class WorkSpecializationComponent implements OnInit, OnDestroy {
  userSpecializationForm!: FormGroup;
  subscriptions: Subscription[] = [];
  specializations!: Specializations[];
  departments!: Departments[];
  userSkills: Skills[] = [];
  user!: CurrentUser;
  settingsSig = signal<InitialSig>({
    success: null,
    error: null,
    pending: false,
  });

  constructor(
    private store: Store,
    private settingsService: SettingsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userSpecializationForm = this.fb.group({
      department: ['', Validators.required],
      specialization: ['', Validators.required],
      skills: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
    });

    const specSub = this.settingsService.getSpecializations().subscribe({
      next: res => {
        this.specializations = res;
      },
    });

    const departmentSub = this.settingsService.getDepartments().subscribe({
      next: res => {
        this.departments = res;
      },
    });

    const skillsSub = this.settingsService.getUserSkills().subscribe({
      next: (res: Skills[]) => {
        this.userSkills = res;
        this.updateSkillsFormArray();
      },
    });

    const storeSub = this.store.select(selectCurrentUser).subscribe({
      next: user => {
        if (user) {
          this.user = user;
          this.setValues();
        }
      },
    });

    this.subscriptions.push(specSub, departmentSub, storeSub, skillsSub);
  }

  getSpecializationErrors(): string {
    const control = this.userSpecializationForm.get('specialization');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      }
    }
    return '';
  }

  getDepartmentErrors(): string {
    const control = this.userSpecializationForm.get('department');
    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.hasError('required')) {
        return 'This field is required';
      }
    }
    return '';
  }

  setValues() {
    if (this.user) {
      this.userSpecializationForm.patchValue({
        department: this.user.department || '',
        specialization: this.user.specializations[0] || '',
        skills: this.user.skills || '',
      });
    }
  }

  getSkillsFormArray(): FormArray {
    return this.userSpecializationForm.get('skills') as FormArray;
  }

  updateSkillsFormArray() {
    const skillControls = this.userSkills.map(skill =>
      this.fb.control(skill, Validators.required)
    );
    this.userSpecializationForm.setControl(
      'skills',
      this.fb.array(skillControls)
    );
  }

  addSkill() {
    this.getSkillsFormArray().push(this.fb.control('', Validators.required));
  }

  get signalValues() {
    const val = this.settingsSig();
    return val;
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.settingsSig.set({
      success: null,
      error: null,
      pending: true,
    });

    if (!this.user) {
      return;
    }

    const reqBody = {
      userId: this.user.userId,
      department: this.user.department,
      specialization: this.user.specializations[0],
      skills: this.user.skills,
    };

    if (this.userSpecializationForm.valid) {
      this.settingsService.updateDetails(reqBody).subscribe({
        next: response => {
          if (response && response.message) {
            this.settingsSig.set({
              success: response,
              error: null,
              pending: false,
            });
            setTimeout(() => {
              this.settingsSig.set({
                success: null,
                error: null,
                pending: false,
              });
            }, 3000);
          }
        },
        error: error => {
          this.settingsSig.set({
            success: null,
            error: error.errors,
            pending: false,
          });

          setTimeout(() => {
            this.settingsSig.set({
              success: null,
              error: null,
              pending: false,
            });
          }, 3000);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
