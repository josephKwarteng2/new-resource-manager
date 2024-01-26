import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { User, ProjectDetails } from '../../../types/types';
import { UsersService } from '../../../../accounts/admin/services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalInputComponent } from '../../global-input/global-input.component';
import { ProjectsService } from '../../../../accounts/admin/services/projects.service';

@Component({
  selector: 'app-general-assign-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, GlobalInputComponent],
  templateUrl: './general-assign-modal.component.html',
  styleUrl: './general-assign-modal.component.css',
})
export class GeneralAssignModalComponent {
  @Input() user!: User;
  @Input() users: User[] = [];
  @Input() project!: ProjectDetails;
  opening: boolean = false;
  closed: boolean = false;
  loading: boolean = false;
  bookableUsers: User[] = [];
  searchQuery: string = '';
  query: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  response: string | null = null;
  projects: any;

  @Output() closeAssignEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();
  selectedUsersEvent = new EventEmitter<User[]>();
  selectedUsers: any;

  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService // private cdr: ChangeDetectorRef
  ) {}

  close() {
    this.closed = true;
    this.closeAssignEvent.emit();
  }

  edit() {}

  submit(): void {
    this.usersService
      .assignUser(
        this.project.name,
        this.bookableUsers
          .filter(user => user.selected)
          .map(user => user.userId)
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 201) {
            this.successMessage = `${this.project.name} is successfully assigned to ${this.user.firstName}.`;
          } else {
            this.successMessage = response.message;
          }
          this.response = response;
        },
        error: (error: any) => {
          if (error.status >= 500) {
            this.errorMessage =
              'Server Error: Something went wrong on the server.';
          } else {
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'An unexpected error occurred.';
            }
          }

          setTimeout(() => {
            this.errorMessage = null;
          }, 6000);
        },

        complete: () => {
          this.close();
        },
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.opening = false;
    }, 100);
    console.log(this.user);

    this.fetchBookableUsers(this.query);
    this.fetchProjects();
  }

  ngAfterViewInit(): void {
    console.log('View has been initialized');
    this.fetchBookableUsers(this.query);
  }

  onSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.fetchBookableUsers(query);
  }

  fetchBookableUsers(query: string): void {
    this.loading = true;
    this.usersService.getBookableUsers(query).subscribe({
      next: (response: any) => {
        const bookableUsers = response.users || response.data;
        if (Array.isArray(bookableUsers)) {
          this.bookableUsers = bookableUsers as User[];
        } else {
          console.log('Invalid bookable users format:', bookableUsers);
        }
      },
      error: error => {
        console.log('Error fetching users:', error);
      },
      complete: () => {
        this.loading = false;
        // this.cdr.detectChanges();
      },
    });
  }

  private fetchProjects(): void {
    this.projectsService.fetchProjects().subscribe({
      next: (response: any) => {
        this.project = response.projects || [];
        console.log('Fetched projects:', this.project);
      },
      error: error => {
        console.error('Error fetching projects:', error);
      },
      complete: () => {},
    });
  }

  get modalClasses() {
    return {
      [`modal`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }

  get backdropClasses() {
    return {
      [`backdrop`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }
}
