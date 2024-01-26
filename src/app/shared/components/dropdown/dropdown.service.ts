import {
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import { User } from '../../types/types';
import { ProjectDetails } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private injector: Injector) {}

  open(
    viewContainerRef: ViewContainerRef,
    user: User,
    position: { top: number; left: number }
  ): ComponentRef<DropdownComponent> {
    const dropdownComponentRef = viewContainerRef.createComponent(
      DropdownComponent,
      {
        injector: this.injector,
      }
    );
    dropdownComponentRef.instance.position = position;
    dropdownComponentRef.instance.user = user;
    dropdownComponentRef.instance.closeEvent.subscribe(() =>
      this.closeDropdown(dropdownComponentRef)
    );
    return dropdownComponentRef;
  }

  closeDropdown(dropdownComponentRef: ComponentRef<DropdownComponent>) {
    dropdownComponentRef.destroy();
  }
}
