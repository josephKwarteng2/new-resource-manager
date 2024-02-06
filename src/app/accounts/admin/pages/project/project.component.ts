import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ProjectCreationModalComponent } from '../../../../shared/components/modals/project-creation-modal/project-creation-modal.component';
import { ProjectTableComponent } from '../../components/project-table/project-table.component';
import { ArchivedProjectsComponent } from '../../components/archived-projects/archived-projects.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ButtonNewComponent,
    ProjectCreationModalComponent,
    ProjectTableComponent,
    ArchivedProjectsComponent,
    CommonModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements AfterViewInit {  
  @ViewChild(ProjectTableComponent) projectTableComponent?: ProjectTableComponent;
  successMessage: string | null = null;
  ngAfterViewInit(): void {
   
    if (this.projectTableComponent) {
      this.projectTableComponent.fetchProjects();
    }
  }
  updateProjects(): void {
    if (this.projectTableComponent) {
      this.projectTableComponent.fetchProjects();
      this.successMessage = 'Project created successfully!';

      this.projectCreationModalOpen = false;

    
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

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
