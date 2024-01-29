import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UsersService } from '../../../../accounts/admin/services/users.service';
import { User } from '../../../types/types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-delete-modal.component.html',
  styleUrl: './user-delete-modal.component.css',
})
export class UserDeleteModalComponent {
  @Input() user: User | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  cancelDelete() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete() {
    this.activeModal.close('delete');
  }
}
