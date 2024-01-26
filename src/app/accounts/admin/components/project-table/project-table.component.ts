import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownService } from '../../../../shared/components/dropdown/dropdown.service';
import { User } from '../../../../shared/types/types';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import {
  ProjectDetails,
  GenericResponse,
} from '../../../../shared/types/types';
import { AssignModalService } from '../../../../shared/components/modals/assign-modal/assign.service';
import { AssignModalComponent } from '../../../../shared/components/modals/assign-modal/assign-modal.component';
import { ProjectCreationModalService } from '../../services/project-creation-modal.service';
import { CommonModule } from '@angular/common';
interface ProjectsApiResponse {
  projects: ProjectDetails[];
}

@Component({
  selector: 'app-project-table',
  standalone: true,
  imports: [CommonModule, AssignModalComponent],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.css',
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  totalPages: number = 0;
  projects: ProjectDetails[] = [];
  loading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  users: User[] = [];
  isMenuOpen: boolean = false;
  showDropdownForProject: ProjectDetails | null = null;

  private dataSubscription: Subscription | undefined;
  private dropdownRef?: ComponentRef<DropdownComponent>;
  private assignModalRef?: ComponentRef<AssignModalComponent>;

  constructor(
    private projectService: ProjectCreationModalService,
    private dropdownService: DropdownService,
    private viewContainerRef: ViewContainerRef,
    private assignModalService: AssignModalService
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  openAssignModal(project: ProjectDetails): void {
    const modalComponentRef = this.assignModalService.open(
      this.viewContainerRef
    );
    modalComponentRef.instance.project = project;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(projects: ProjectDetails): void {
    this.showDropdownForProject =
      this.showDropdownForProject === projects ? null : projects;
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  fetchProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe(
      (response: any) => {
        console.log(response);

        const projects = response.projects || response;
        if (Array.isArray(projects)) {
          this.projects = projects as ProjectDetails[];
        } else {
          console.error('Invalid response format for projects:', projects);
        }
      },
      error => {
        console.error('Error fetching clients:', error);
      },
      () => {
        this.loading = false;
      }
    );
  }

  deleteProject(projectCode: string): void {
    this.projectService.deleteProject(projectCode).subscribe({
      next: () => {
        this.successMessage = 'Project deleted successfully.';
        this.errorMessage = null;
        this.fetchProjects();
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: error => {
        this.errorMessage = 'Error deleting project.';
        this.successMessage = null;
        console.error('Error deleting project:', error);
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }
}
