import { Component, OnInit } from '@angular/core';
import { ClientDetails, GenericResponse } from '../../../../shared/types/types';
import { ClientCreationModalService } from '../../services/client-creation-modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
})
export class ClientTableComponent implements OnInit {
  clients: ClientDetails[] = [];
  loading: boolean = false;
  constructor(private clientcreationmodalService: ClientCreationModalService) {}
  ngOnInit(): void {
    this.loading = false;
    this.fetchClients();
  }

  fetchClients(): void {
    this.loading = true;
    this.clientcreationmodalService.getClients().subscribe(
      (response: any) => {
        const clients = response.clients || response;
        if (Array.isArray(clients)) {
          this.clients = clients as ClientDetails[];
        } else {
          console.error('Invalid response format for clients:', clients);
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
}
