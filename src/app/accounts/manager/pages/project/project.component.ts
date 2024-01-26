import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCreationModalComponent } from '../../../../shared/components/modals/project-creation-modal/project-creation-modal.component';
import { ProjectTableComponent } from '../../../admin/components/project-table/project-table.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCreationModalComponent,
    ProjectTableComponent,
    ButtonNewComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  projectCreationModalOpen = false;

  openProjectCreationModal() {
    this.projectCreationModalOpen = true;
  }
}
