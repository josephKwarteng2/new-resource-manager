import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectDetails } from '../../../../shared/types/types';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-archived-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archived-projects.component.html',
  styleUrl: './archived-projects.component.css',
})
export class ArchivedProjectsComponent {
  archivedProjects: ProjectDetails[] = [];
  loading: boolean = true;

  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.fetchArchivedProjects();
  }

  fetchArchivedProjects(): void {
    this.loading = true;
    this.projectService.archivedProjects().subscribe({
      next: (response: any) => {
        const archivedProjects = response?.archives || [];
        if (Array.isArray(archivedProjects)) {
          this.archivedProjects = archivedProjects as ProjectDetails[];
          // this.totalProjects = archivedProjects.length;
        } else {
          console.error('Invalid archived users format:', archivedProjects);
        }
      },
      error: error => {
        console.error('Error fetching archived users:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
