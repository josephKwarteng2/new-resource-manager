import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ClientCreationModalComponent } from '../../../../shared/components/modals/client-creation-modal/client-creation-modal.component';
import { ClientTableComponent } from '../../components/client-table/client-table.component';
import { ArchivedClientsListComponent } from '../../components/archived-clients-list/archived-clients-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ButtonNewComponent,
    ClientCreationModalComponent,
    ClientTableComponent,
    ArchivedClientsListComponent,
    CommonModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements AfterViewInit{
  @ViewChild(ClientTableComponent) clientTableComponent?: ClientTableComponent;
  successMessage: string | null = null;
  ngAfterViewInit(): void {
   
    if (this.clientTableComponent) {
      this.clientTableComponent.fetchClients();
    }
  }
  updateClients(): void {
    if (this.clientTableComponent) {
      this.clientTableComponent.fetchClients();
      this.successMessage = 'client created successfully!';
      console.log('success')

      this.clientCreationModalOpen = false;

    
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

  clientCreationModalOpen = false;
  display: 'all' | 'archives' = 'all';
  closed: boolean = false;
  opening: boolean = true;

  toggleDisplay(view: 'all' | 'archives'): void {
    this.display = view;
  }

  openClientCreationModal() {
    this.clientCreationModalOpen = true;
  }
}
