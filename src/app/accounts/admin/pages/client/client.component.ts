import { Component } from '@angular/core';
import { ButtonNewComponent } from '../../../user/components/button-new/button-new.component';
import { ClientCreationModalComponent } from '../../../../shared/components/modals/client-creation-modal/client-creation-modal.component';
import { ClientTableComponent } from '../../components/client-table/client-table.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ButtonNewComponent,
    ClientCreationModalComponent,
    ClientTableComponent
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
