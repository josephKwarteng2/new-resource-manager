import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientDetails, ProjectDetails } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  @Input() client?: ClientDetails | null = null;
  @Input() project?: ProjectDetails | null = null;
  @Input() employee?: { picture: string | null | undefined };
  constructor(public activeModal: NgbActiveModal) { }
  
  closeModal(): void {
    this.activeModal.close();
  }

}
