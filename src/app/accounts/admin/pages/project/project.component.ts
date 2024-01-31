import { Component } from '@angular/core';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ProjectCreationModalComponent } from '../../../../shared/components/modals/project-creation-modal/project-creation-modal.component';
import { ProjectTableComponent } from '../../components/project-table/project-table.component';
import { ArchivedProjectsComponent } from '../../components/archived-projects/archived-projects.component';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ButtonNewComponent,
    ProjectCreationModalComponent,
    ProjectTableComponent,
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

  get toggleClasses() {
    return {
      [`currentview`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }
}
