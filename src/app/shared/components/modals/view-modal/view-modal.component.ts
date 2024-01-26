import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../types/types';

/**
 * how to use modal
 * 1. Import and inject the modal service in any component where you want to trigger open the modal
 * 2. Import and inject ViewContainerRef from '@angular/core' in the same component
 * 3. Call the open method of the modal service and pass the viewContainerRef as the first argument
 * followed by an object with the user property as the second argument like this:
 * @example
 * ```
 * this.modalService.open(this.viewContainerRef, { user: user });
 * ```
 * 4. The modal and backdrop automatically handle closing
 */
@Component({
  selector: 'view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-modal.component.html',
  styleUrl: './view-modal.component.css',
})
export class ViewModalComponent implements OnInit {
  @Input() user!: User;
  display: 'general' | 'normal-avaliability' = 'general';
  closed: boolean = false;
  opening: boolean = true;

  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<void>();

  close() {
    this.closed = true;
    // this.closeEvent.emit();
  }

  // toggleDisplay(view: 'general' | 'normal-available'): void {
  //   this.display = view;
  // }

  edit() {}

  submit() {
    this.submitEvent.emit();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.opening = false;
    }, 100);
    console.log(this.user);
  }

  get modalClasses() {
    return {
      [`modal`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }

  get backdropClasses() {
    return {
      [`backdrop`]: true,
      [`opening`]: this.opening,
      [`closed`]: this.closed,
    };
  }
}
