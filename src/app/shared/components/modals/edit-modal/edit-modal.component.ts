import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalInputComponent } from '../../global-input/global-input.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, GlobalInputComponent, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css',
})
export class EditModalComponent implements OnInit {
  isOnline: boolean = navigator.onLine;
  userDetails!: FormGroup;

  ngOnInit() {
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));

    this.userDetails = new FormGroup({
      profilePicture: new FormControl(null),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
      ]),
    });
  }

  private updateOnlineStatus(online: boolean) {
    this.isOnline = online;
  }
}
