import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetails, EmployeeDetails } from '../../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.css'],
})
export class ProjectDetailsModalComponent {
  @Input() project?: ProjectDetails | null = null;

  constructor(public activeModal: NgbActiveModal) {}
  hasEmployees(): boolean {
    return !!this.project?.employees && this.project?.employees.length > 0;
  }
  closeModal(): void {
    this.activeModal.close();
  }

  generateClientInitials(clientName: string): string {
    const words = clientName.split(' ');
  
    const filteredLetters = words
      .map(word => word.replace(/[^a-zA-Z]/g, ''))
      .filter(word => word.length > 0);
  
    if (filteredLetters.length === 1) {
      const name = filteredLetters[0];
      return name.length > 1 ? name[0] + name[name.length - 1] : name[0].toUpperCase();
    } else {
      return filteredLetters.map(word => word[0]).join('').toUpperCase();
    }
  }
  
  
  
  


}
