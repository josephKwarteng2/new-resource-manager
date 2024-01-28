import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { GenericResponse, User } from '../../../../shared/types/types';

@Component({
  selector: 'archived-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archived-list.component.html',
  styleUrl: './archived-list.component.css',
})
export class ArchivedListComponent implements OnInit {
  archivedUsers: User[] = [];
  loading: boolean = false;
  showDropdownForUser: User | null = null;
  totalUsers: number = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchArchivedUsers();
  }

  toggleDropdown(user: User): void {
    this.showDropdownForUser = this.showDropdownForUser === user ? null : user;
  }

  fetchArchivedUsers(): void {
    this.loading = true;
    this.usersService.archivedUsers().subscribe({
      next: (response: any) => {
        const archivedUsers = response?.archives || [];
        if (Array.isArray(archivedUsers)) {
          this.archivedUsers = archivedUsers as User[];
          this.totalUsers = archivedUsers.length;
        } else {
          console.error('Invalid archived users format:', archivedUsers);
        }
      },
      error: error => {
        console.error('Error fetching archived users:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  restoreUser(email: string): void {
    this.loading = true;
    this.usersService.restoreUser(email).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        this.fetchArchivedUsers();
      },

      error: (error: any) => {
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

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }
}
