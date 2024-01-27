import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientCreationModalComponent } from '../../../../shared/components/modals/client-creation-modal/client-creation-modal.component';
import { ClientTableComponent } from '../../../admin/components/client-table/client-table.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ArchivedClientsListComponent } from '../../../admin/components/archived-clients-list/archived-clients-list.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    ClientCreationModalComponent,
    ClientTableComponent,
    ButtonNewComponent,
    ArchivedClientsListComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
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
