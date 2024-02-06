import { Component, OnInit, Input, ChangeDetectorRef,Output, EventEmitter } from '@angular/core';
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
export class ProjectCreationModalComponent implements OnInit {
  @Output() projectCreated: EventEmitter<void> = new EventEmitter<void>();
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

  constructor(
    private projectcreationService: ProjectCreationModalService,
    private clientService: ClientCreationModalService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef

  ){
    this.formData = this.fb.group({
      details: [''],
      name: [''],
      clientId: [''],
      
      clientSearch: [''],
      startDate: [''],
      endDate: [''],
      projectType: [''],
      billable: [false],
      
    });
  }



  onCreateProject(){
    this.loading = true;
    this.success = false;
    this.error = false;
    this.errorMessages = {};
    

    if (this.formData.valid) {
      // const formDataValue = this.formData.value;
      // formDataValue.billable = formDataValue.billable !== undefined ? formDataValue.billable : false;
      // const billable = formDataValue['billable'];
      // const startDate = formDataValue['start-date'];
      // const endDate = formDataValue['end_date'];
      // const projectStatus = formDataValue['project-status'];



      // const isBillable = billable === 'on';

      // const projectData = {
      //   details: formDataValue['details'],
      //   name: formDataValue['name'],
      //   client: formDataValue['client'],

      //   startDate: startDate,
      //   endDate: endDate,
      //   projectStatus: projectStatus,
      //   billable: isBillable,
      // };
      const isBillable = this.formData.get('billable')?.value || false;
      this.loading = true;

      this.projectcreationService
        .addNewProject({...this.formData.value, billable: isBillable})//valid before passing
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          response => {
            
            this.success = true;
            this.successMessage = 'Project created successfully!';
            this.projectCreated.emit();
            this.formData.reset();
            this.formData.get('clientSearch')?.setValue('');
            
          },
          error => {
            

            this.error = true;
            if (error.status >= 500) {
              this.errorMessages.serverError =
                'Server Error" Something went wrong on the server.';
            } else {
              if (error.error && error.error.message) {
                this.errorMessages.serverError = error.error.message;
              } else {
                this.errorMessages.serverError = 'An unexpected error occured.';
              }
            }
            this.clearErrorMessagesAfterDelay();
            this.formData.markAsTouched();
          }
        );
    } else {
       this.errorMessages.serverError= 'Please enter valid inputs or complete the form';
    }
   
  }
  clearErrorMessagesAfterDelay() {
    setTimeout(() => {
      this.successMessage
      this.errorMessages.serverError
    }, 3000); 
   
  }


  closeProjectcreationModal() {
    this.isOpen = false;

  }
  openClientCreationModal() {
    this.clientService.openClientCreationModal();
    
  }
  

  
  
  
  ngOnInit(): void {
    this.fetchClients();
  

    this.formData.get('clientSearch')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => this.filterClients());
    
  
  }

  fetchClients(): void {
    this.clientCreationModalOpen = false;
    this.clientService.getClients()
      .subscribe(
        (response: { clients: ClientDetails[] }) => {
          if (Array.isArray(response.clients)) {
            this.clients = response.clients;
            this.filteredClients = response.clients; 
          } else {
            console.log('Error retrieving clients. Please try again later.');
          }
        }
      );

    this.clientService.clientCreated.subscribe((updatedClient: ClientDetails) => {

      this.clients.push(updatedClient.client);
   
      
      this.filterClients();
    });
  }
  
  
    
  
  filterClients(): void {
    const searchTerm = this.formData.get('clientSearch')!.value;
    if (this.clients && Array.isArray(this.clients)) {
      this.filteredClients = this.clients.filter(client =>
        client && client.name && typeof client.name === 'string' &&
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
          }
  }
  
  
  selectClient(client: ClientDetails): void {
    if (this.formData.get('clientSearch')) {
   
      this.formData.get('clientId')!.setValue(client.clientId);
  

      this.formData.get('clientSearch')!.setValue(client.name);

      this.showClientDropdown = false;
    }
  }

  handleClientCreated(updatedData: { client: ClientDetails }): void {
    console.log('Updated Clients in ProjectCreation:', updatedData.client);
    this.clients.push(updatedData.client);

    this.filterClients();

    this.cdr.detectChanges();
    this.clientCreationModalOpen = false;
  }
  
  
  
  
}
