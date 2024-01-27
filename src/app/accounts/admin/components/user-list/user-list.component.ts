import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ComponentRef,
  Input,
} from '@angular/core';
import { GenericResponse, User } from '../../../../shared/types/types';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ViewModalComponent } from '../../../../shared/components/modals/view-modal/view-modal.component';
// import { DeleteModalComponent } from '../../../../shared/components/modals/delete-modal/delete-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { AssignModalComponent } from '../../../../shared/components/modals/assign-modal/assign-modal.component';
import { AssignModalService } from '../../../../shared/components/modals/assign-modal/assign.service';
import { DropdownService } from '../../../../shared/components/dropdown/dropdown.service';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { ViewModalService } from '../../../../shared/components/modals/view-modal/view-modal.service';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    CommonModule,
    ViewModalComponent,
    PaginationComponent,
    AssignModalComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  @Input() user!: User;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  loading: boolean = false;
  showDropdownForUser: User | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  totalUsers: number = 0;
  selectedUsers: User[] = [];

  private dataSubscription: Subscription | undefined;
  private viewModalRef?: ComponentRef<ViewModalComponent>;
  private assignModalRef?: ComponentRef<AssignModalComponent>;
  private dropdownRef?: ComponentRef<DropdownComponent>;

  constructor(
    private usersService: UsersService,
    private dropdownService: DropdownService,
    private viewContainerRef: ViewContainerRef,
    private assignModalService: AssignModalService,
    private viewModalService: ViewModalService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  toggleDropdown(user: User): void {
    this.showDropdownForUser = this.showDropdownForUser === user ? null : user;
  }

  openViewModal(user: User) {
    this.viewModalRef = this.viewModalService.open(this.viewContainerRef, {
      user,
    });
  }

  openDropdown(event: MouseEvent, user: User) {
    const position = {
      top: event.clientY + 20,
      left: event.clientX - 100,
    };
    this.dropdownRef = this.dropdownService.open(
      this.viewContainerRef,
      user,
      position
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  fetchUsers(): void {
    this.loading = true;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    const endIndex = startIndex + this.itemsPerPage;

    this.usersService.getUsers().subscribe({
      next: (response: any) => {
        const users = response.users || response.data;
        if (Array.isArray(users)) {
          this.users = users.slice(startIndex, endIndex) as User[];
          this.totalUsers = users.length;
          this.totalPages = Math.ceil(users.length / this.itemsPerPage);
        } else {
          console.error('Invalid response format for users:', users);
        }
      },
      error: error => {
        console.error('Error fetching users:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  archiveUser(user: User): void {
    console.log(user);
    this.usersService.archiveUser(user.email).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.fetchUsers();
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
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
        }, 3000);
      },
    });
  }

  toggleUserSelection(user: User): void {
    if (this.isSelected(user)) {
      this.selectedUsers = this.selectedUsers.filter(u => u !== user);
    } else {
      this.selectedUsers.push(user);
    }
  }

  isSelected(user: User): boolean {
    return this.selectedUsers.includes(user);
  }
}
