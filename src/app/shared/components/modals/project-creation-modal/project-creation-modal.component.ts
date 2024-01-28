import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,

  ReactiveFormsModule,
  FormBuilder,


} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { finalize, debounceTime, distinctUntilChanged  } from 'rxjs/operators';
import { ProjectCreationModalService } from '../../../../accounts/admin/services/project-creation-modal.service';
import { ClientCreationModalService } from '../../../../accounts/admin/services/client-creation-modal.service';
import { ClientDetails } from '../../../types/types';
import { ClientCreationModalComponent } from '../client-creation-modal/client-creation-modal.component';
import { GlobalInputComponent } from '../../global-input/global-input.component';


@Component({
  selector: 'app-project-creation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ClientCreationModalComponent, GlobalInputComponent],
  templateUrl: './project-creation-modal.component.html',
  styleUrl: './project-creation-modal.component.css'
})
export class ProjectCreationModalComponent implements OnInit{
  @Input() isOpen = true;
  clientCreationModalOpen = false;
  showClientDropdown = false;
  showClientCreationModal: boolean = false;
  formData: FormGroup;
  loading = false;
  success = false;
  error = false;
  errorMessages: { serverError?: string } = {};
  successMessage: string = '';
  clients: ClientDetails[] = [];
  filteredClients: ClientDetails[] = [];
  date: Date | undefined;
  newClient: ClientDetails = {} as ClientDetails;
  constructor(
    private projectcreationService: ProjectCreationModalService,
    private clientService: ClientCreationModalService,
    private fb: FormBuilder,
    private modalService: NgbModal,

  ){
    this.formData = this.fb.group({
      details: [''],
      name: [''],
      clientId: [''],
      date: [''],
      clientSearch: [''],
      startDate: [''],
      endDate: [''],
      projectType: [''],
      billable: [''],
      
    });
  }

  onCreateProject(){
    this.loading = true;
    this.success = false;
    this.error = false;
    this.errorMessages = {};

    if (this.formData.valid) {
      const formDataValue = this.formData.value;
      const startDate = formDataValue['start-date'];
      const endDate = formDataValue['end_date'];
      const projectStatus = formDataValue['project-status'];
      const billable = formDataValue['billable'];


      const isBillable = billable === 'on';

      const projectData = {
        details: formDataValue['details'],
        name: formDataValue['name'],
        client: formDataValue['client'],
        date: formDataValue['date'],
        startDate: startDate,
        endDate: endDate,
        projectStatus: projectStatus,
        billable: isBillable,
      };
      this.loading = true;

      this.projectcreationService
        .addNewProject(this.formData.value)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          response => {
            this.formData.reset();
            this.success = true;
            this.successMessage = 'Project created successfully!';
          },
          error => {
            

            this.error = true;
            if (error.status === 400) {
              this.errorMessages.serverError = 'Invalid inputs. Please check your input.';
            } else if (error.status === 401) {
              this.errorMessages.serverError = 'Unauthorized. Please log in as Admin or Manager.';
            } else if (error.status === 403) {
              this.errorMessages.serverError = 'You do not have the necessary permission to perform this task.';
            } else if (error.status === 404) {
              this.errorMessages.serverError = 'Resource not found. Please try again or contact IT support';
            } else if (error.status >= 500) {
              this.errorMessages.serverError = 'Server error. Please try again later.';
            } else {
              this.errorMessages.serverError = 'An error occurred. Please try again.';
            }
            this.formData.markAsTouched();
          }
        );
    } else {
       this.errorMessages.serverError= 'Please enter valid inputs or complete the form';
    }
  }
  closeProjectcreationModal() {
    this.isOpen = false;

  }
  openClientCreationModal() {
    this.clientService.openClientCreationModal();
  }
  

  onClientCreated(newClient: ClientDetails) {
    this.formData.get('clientSearch')!.setValue(newClient.name);
  

    this.showClientCreationModal = false;
  }
  
  ngOnInit(): void {
    this.fetchClients();

    
    this.formData.get('clientSearch')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => this.filterClients());

    this.clientService.clientCreated.subscribe((newClient: ClientDetails) => {
      this.onClientCreated(newClient);
    });

  }
  fetchClients(): void {
    this.clientService.getClients()
      .subscribe(
        (response: { clients: ClientDetails[] }) => {
          if (Array.isArray(response.clients)) {
            this.clients = response.clients;
          } else {
            this.handleError('Error retrieving clients. Please try again later.');
          }
        }
      );
  }
  private handleError(errorMessage: string): void {
    this.error = true;
    this.errorMessages.serverError = errorMessage;

  }
  
    
  
  filterClients(): void {
    const searchTerm = this.formData.get('clientSearch')!.value;
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  selectClient(client: ClientDetails): void {
    if (this.formData.get('clientSearch')) {
   
      this.formData.get('clientId')!.setValue(client.clientId);
  

      this.formData.get('clientSearch')!.setValue(client.name);

      this.showClientDropdown = false;
    }
  }

}
