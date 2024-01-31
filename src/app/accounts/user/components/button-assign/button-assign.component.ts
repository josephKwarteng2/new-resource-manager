import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { AssignModalComponent } from '../../../../shared/components/modals/assign-modal/assign-modal.component';
import { AssignModalService } from '../../../../shared/components/modals/assign-modal/assign.service';
import { User } from '../../../../shared/types/types';
import { GeneralAssignModalComponent } from '../../../../shared/components/modals/general-assign-modal/general-assign-modal.component';
import { GeneralAssignModalService } from '../../../../shared/components/modals/general-assign-modal/general-assign-modal.service';
@Component({
  selector: 'button-assign',
  standalone: true,
  imports: [CommonModule, AssignModalComponent, GeneralAssignModalComponent],
  templateUrl: './button-assign.component.html',
  styleUrl: './button-assign.component.css',
})
export class ButtonAssignComponent {
  // @Output() selectedUsers = new EventEmitter<User[]>();
  @Input() user!: User;
  @Input() selectedUsers: User[] = [];
  @Output() selectedUsersEvent = new EventEmitter<User[]>();

  private assignModalRef?: ComponentRef<GeneralAssignModalComponent>;
  // private generalAssignModalRef?: ComponentRef<GeneralAssignModalComponent>;

  constructor(
    private assignModalService: AssignModalService,
    private viewContainerRef: ViewContainerRef,
    private generalAssignModalService: GeneralAssignModalService
  ) {}

  // openAssignModal(user: User) {
  //   const modalComponentRef = this.assignModalService.open(
  //     this.viewContainerRef,
  //     { user }
  //   );

  //   modalComponentRef.instance.selectedUsersEvent.subscribe(
  //     (selectedUsers: User[]) => {
  //       this.selectedUsers.emit(selectedUsers);
  //     }
  //   );
  // }

  openGeneralAssignModal() {
    this.assignModalRef = this.generalAssignModalService.open(
      this.viewContainerRef,
      {
        users: this.selectedUsers,
      }
    );
  }

  // openGeneralAssignModal(user: User) {
  //   const modalComponentRef = this.generalAssignModalService.open(
  //     this.viewContainerRef,
  //     {
  //       user,
  //     }
  //   );

  // modalComponentRef.instance.selectedUsersEvent.subscribe(
  //   (selectedUsers: User[]) => {
  //     this.selectedUsers.emit(selectedUsers);
  //   }
  // );
}
