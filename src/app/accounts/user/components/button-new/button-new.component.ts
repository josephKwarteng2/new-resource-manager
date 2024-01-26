import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { UsercreationComponent } from '../../../admin/pages/usercreation/usercreation.component';
import { UsercreationModalService } from '../../../admin/services/usercreation-modal.service';
import { ManagerUsercreationService } from '../../../admin/services/manager-usercreation.service';
import { ManagerUsercreationComponent } from '../../../manager/pages/manager-usercreation/manager-usercreation.component';

@Component({
  selector: 'button-new',
  standalone: true,
  imports: [CommonModule, UsercreationComponent, ManagerUsercreationComponent],
  templateUrl: './button-new.component.html',
  styleUrl: './button-new.component.css',
})
export class ButtonNewComponent {
  constructor(
    private usercreationmodalService: UsercreationModalService,
    private managerusercreationmodalService: ManagerUsercreationService
  ) {}

  openUserCreationModal() {
    this.usercreationmodalService
      .openUserCreationModal()
      .result.finally(() => {});
  }
  openManagerUserCreationModal() {
    this.managerusercreationmodalService
      .openManagerUserCreationModal()
      .result.finally(() => {});
  }
}
