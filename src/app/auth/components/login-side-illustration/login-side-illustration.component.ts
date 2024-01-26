import { Component, Input } from '@angular/core';

@Component({
  selector: 'login-side-illustration',
  standalone: true,
  imports: [],
  templateUrl: './login-side-illustration.component.html',
  styleUrl: './login-side-illustration.component.css',
})
export class LoginSideIllustrationComponent {
  @Input() imgUrl!: string;
}
