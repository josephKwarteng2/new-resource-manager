import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, GenericResponse } from '../../../types/types';
import { UsersService } from '../../../../accounts/admin/services/users.service';
@Component({
  selector: 'delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Input() user: User | null = null;
  users: User[] = [];
  closed: boolean = false;
  opening: boolean = true;
  loading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showDeleteModal = false;

  constructor(private usersService: UsersService) {}

  @Output() deleteConfirmedEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  close() {
    this.closed = true;
    this.cancelEvent.emit();
  }

  submit() {
    this.deleteConfirmedEvent.emit();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.opening = false;
    }, 100);
    console.log(this.user);
  }

  openDeleteModal(user: User): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDeletion(): void {
    if (this.user?.email) {
      this.loading = true;
      this.successMessage = null;
      this.errorMessage = null;

      this.usersService.deleteUser(this.user.email).subscribe({
        next: (response: GenericResponse) => {
          this.successMessage =
            response.message || 'User archived successfully';
          this.errorMessage = null;
          setTimeout(() => {
            this.successMessage = null;
            this.loading = false;
            this.closed = true;
            this.fetchUsers();
          }, 1000);
        },
        error: (error: any) => {
          this.errorMessage =
            error.message || 'Error archiving user. Please try again.';
          this.successMessage = null;
          console.error('Error archiving user:', error);
          setTimeout(() => {
            this.errorMessage = null;
            this.loading = false;
          }, 3000);
        },
      });
    }
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  get modalClasses() {
    return {
      modal: true,
      opening: this.opening,
      closed: this.closed,
    };
  }

  get backdropClasses() {
    return {
      backdrop: true,
      opening: this.opening,
      closed: this.closed,
    };
  }
}
