import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClientDetails } from '../../../types/types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-client-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-client-modal.component.html',
  styleUrl: './delete-client-modal.component.css',
})
export class DeleteClientModalComponent {
  @Input() archivedClients: ClientDetails | null = null;

  constructor(public activeModal: NgbActiveModal) {}
  cancelDelete() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete() {
    this.activeModal.close('delete');
  }
}
