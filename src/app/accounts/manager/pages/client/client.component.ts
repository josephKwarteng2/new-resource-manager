import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientCreationModalComponent } from '../../../../shared/components/modals/client-creation-modal/client-creation-modal.component';
import { ClientTableComponent } from '../../../admin/components/client-table/client-table.component';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    ClientCreationModalComponent,
    ClientTableComponent,
    ButtonNewComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  clientCreationModalOpen = false;

  openClientCreationModal() {
    this.clientCreationModalOpen = true;
  }
}
