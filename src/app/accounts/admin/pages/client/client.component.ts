import { Component } from '@angular/core';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ClientCreationModalComponent } from '../../../../shared/components/modals/client-creation-modal/client-creation-modal.component';
import { ClientTableComponent } from '../../components/client-table/client-table.component';
import { ArchivedClientsListComponent } from '../../components/archived-clients-list/archived-clients-list.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ButtonNewComponent,
    ClientCreationModalComponent,
    ClientTableComponent,
    ArchivedClientsListComponent,
    ClientTableComponent,
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
