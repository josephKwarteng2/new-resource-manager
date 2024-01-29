import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientDetails, GenericResponse } from '../../../../shared/types/types';
import { ClientCreationModalService } from '../../services/client-creation-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteClientModalComponent } from '../../../../shared/components/modals/delete-client-modal/delete-client-modal.component';

@Component({
  selector: 'app-archived-clients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archived-clients-list.component.html',
  styleUrl: './archived-clients-list.component.css',
})
export class ArchivedClientsListComponent implements OnInit {
  loading: boolean = true;
  showDropdownForClient: ClientDetails | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  archivedClients: ClientDetails[] = [];

  constructor(
    private clientCreationModalService: ClientCreationModalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchArchivedClients();
  }

  toggleDropdown(archivedClients: ClientDetails): void {
    this.showDropdownForClient =
      this.showDropdownForClient === archivedClients ? null : archivedClients;
  }

  fetchArchivedClients(): void {
    this.loading = true;
    this.clientCreationModalService.archivedClients().subscribe({
      next: (response: any) => {
        const archivedClients = response?.archives || [];
        if (Array.isArray(archivedClients)) {
          this.archivedClients = archivedClients as ClientDetails[];
          // this.totalClients = archivedClients.length;
        } else {
          console.log('Invalid archived client format:', archivedClients);
        }
      },

      error: error => {
        console.log('Error fetching archived clients:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  restoreClient(clientId: string): void {
    this.loading = true;
    this.clientCreationModalService.restoreClient(clientId).subscribe({
      next: (response: GenericResponse) => {
        this.successMessage = response.message;
        this.fetchArchivedClients();

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
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

  openDeleteClientModal(archivedclient: ClientDetails) {
    const modalRef = this.modalService.open(DeleteClientModalComponent);
    modalRef.componentInstance.archivedClients = archivedclient;

    modalRef.result.then(
      result => {
        if (result === 'delete') {
          this.deleteClient(archivedclient);
        }
      },
      reason => {
        // Handle modal dismissal/cancel
      }
    );
  }

  deleteClient(client: ClientDetails): void {
    if (!client) {
      console.log('Invalid client data for deletion', client);
      return;
    }

    this.clientCreationModalService.deleteClient(client.clientId).subscribe({
      next: (response: GenericResponse) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        this.fetchArchivedClients();
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
