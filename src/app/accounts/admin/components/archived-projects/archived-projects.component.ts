import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  GenericResponse,
  ProjectDetails,
} from '../../../../shared/types/types';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-archived-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archived-projects.component.html',
  styleUrl: './archived-projects.component.css',
})
export class ArchivedProjectsComponent implements OnInit {
  archivedProjects: ProjectDetails[] = [];
  loading: boolean = true;
  showDropdownForProject: ProjectDetails | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.fetchArchivedProjects();
  }

  toggleDropdown(archivedProjects: ProjectDetails): void {
    this.showDropdownForProject =
      this.showDropdownForProject === archivedProjects
        ? null
        : archivedProjects;
  }

  fetchArchivedProjects(): void {
    this.loading = true;
    this.projectsService.archivedProjects().subscribe({
      next: (response: any) => {
        const archivedProjects = response?.archives || [];
        if (Array.isArray(archivedProjects)) {
          this.archivedProjects = archivedProjects as ProjectDetails[];
          // this.totalProjects = archivedProjects.length;
        } else {
          console.error('Invalid archived project format:', archivedProjects);
        }
      },
      error: error => {
        console.error('Error fetching archived projects:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  restoreProject(projectId: string): void {
    this.projectsService.restoreProject(projectId).subscribe({
      next: (response: GenericResponse) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        this.fetchArchivedProjects();
      },

      error: (error: any) => {
        if (error.status >= 500) {
          this.errorMessage =
            'Server Error: Something went wrong on the server.';
        } else {
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'An unexpected error occured';
          }
        }

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }
}
