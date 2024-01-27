import { CommonModule} from '@angular/common';
import { Component, Input  } from '@angular/core';
import { ProjectDetails } from '../../../types/types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-project-modal',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './delete-project-modal.component.html',
  styleUrl: './delete-project-modal.component.css'
})
export class DeleteProjectModalComponent {
  @Input() project: ProjectDetails | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  cancelDelete() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete() {
    this.activeModal.close('delete');
  }
}
