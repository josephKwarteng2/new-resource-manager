import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SideNavComponent } from '../../shared/components/side-nav/side-nav.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SideNavComponent],
  template: `<div>
    <side-nav userRole="manager"></side-nav>
    <rm-header></rm-header>

    <router-outlet></router-outlet>
  </div>`,
})
export class MainComponent {}
