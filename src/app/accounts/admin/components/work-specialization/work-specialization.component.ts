import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { SettingsService } from '../../../user/services/settings.service';
import { selectCurrentUser } from '../../../../auth/store/authorization/AuthReducers';
import {
  CurrentUser,
  Departments,
  InitialSig,
  Specializations,
  Skills,
  GenericResponse,
} from '../../../../shared/types/types';

@Component({
  selector: 'adm-work-specialization',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-specialization.component.html',
  styleUrls: [
    './work-specialization.component.css',
    // '../../pages/setting/setting.component.css',
  ],
})
export class WorkSpecializationComponent implements OnInit, OnDestroy {
  userSpecializationForm!: FormGroup;
  subscriptions: Subscription[] = [];
  specializations!: Specializations[];
  departments!: Departments[];
  skills: Skills[] = [];
  loading: Boolean = false;
  enteredSkills: string[] = [];
  user!: CurrentUser;
  settingsSig = signal<InitialSig>({
    success: null,
    error: null,
    pending: false,
  });

  constructor(private store: Store, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.userSpecializationForm = new FormGroup({
      department: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
    });

    const specSub = this.settingsService.getSpecializations().subscribe({
      next: (res: any) => {
        this.specializations = res;
      },
    });

    const departmentSub = this.settingsService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res;
      },
    });

    // const skillsSub = this.settingsService.getUserSkills().subscribe({
    //   next: res => {
    //     this.skills = res;
    //   },
    // });
    const storeSub = this.store.select(selectCurrentUser).subscribe({
      next: user => {
        if (user) {
          this.user = user;
          this.setValues();
        }
      },
    });

    this.subscriptions.push(specSub, departmentSub, storeSub);
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
        // skills: this.user.skills || '',
      });
    }
  }

  get signalValues() {
    const val = this.settingsSig();
    return val;
  }

  addSkill(skill: string): void {
    if (!this.user) {
      console.error('User details not available.');
      return;
    }

    const updatedUser: CurrentUser = { ...this.user };

    updatedUser.skills = [...this.user.skills, skill as Skills];
    this.settingsService.addUserSkills(updatedUser).subscribe({
      next: (response: any) => {
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
            this.loading = false;
          }, 3000);
        }
      },
      error: (error: any) => {
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
          this.loading = false;
        }, 3000);
      },
    });
  }

  removeSkill(skill: string): void {
    const index = this.enteredSkills.indexOf(skill);
    if (index !== -1) {
      this.enteredSkills.splice(index, 1);
    }
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.settingsSig.set({
      success: null,
      error: null,
      pending: true,
    });

    if (!this.user) {
      console.error('User details not available.');
      return;
    }

    const reqBody = {
      userId: this.user.userId,
      department: this.userSpecializationForm.get('department')?.value || '',
      specialization:
        this.userSpecializationForm.get('specialization')?.value || '',
      skills: this.userSpecializationForm.get('skills')?.value || [],
    };

    const skill = this.userSpecializationForm.get('skills')?.value;
    if (skill && skill.trim() !== '') {
      const trimmedSkill = skill.trim();
      this.enteredSkills.push(trimmedSkill);
      this.addSkill(trimmedSkill);
      this.userSpecializationForm.get('skills')?.reset();
    }

    if (this.userSpecializationForm.valid) {
      this.loading = true;
      this.settingsService.updateAdminSpecialization(reqBody).subscribe({
        next: (response: any) => {
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
              this.loading = false;
            }, 3000);
          }
        },
        error: (error: any) => {
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
            this.loading = false;
          }, 3000);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // addSkill(skillData: SkillData): void {
  //   this.settingsService.addSkill(skillData).subscribe({
  //     next: (response: GenericResponse) => {
  //       // Handle the success response if needed
  //       console.log(response);
  //     },
  //     error: (error: any) => {
  //       // Handle the error response if needed
  //       console.error(error);
  //     },
  //   });
  // }
}
