import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCreationModalComponent } from '../../../../shared/components/modals/project-creation-modal/project-creation-modal.component';
import { ProjectTableComponent } from '../../../admin/components/project-table/project-table.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ArchivedProjectsComponent } from '../../../admin/components/archived-projects/archived-projects.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCreationModalComponent,
    ProjectTableComponent,
    ButtonNewComponent,
    ArchivedProjectsComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  projectCreationModalOpen = false;
  display: 'all' | 'archives' = 'all';
  closed: boolean = false;
  opening: boolean = true;

  toggleDisplay(view: 'all' | 'archives'): void {
    this.display = view;
  }

  openProjectCreationModal() {
    this.projectCreationModalOpen = true;
  }
}
