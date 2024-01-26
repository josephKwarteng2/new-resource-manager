import { inject } from '@angular/core';
import { RoleService } from '../../shared/services/role.service';
import { Router } from '@angular/router';

/**
 * Validates various roles with role service
 */
export const AdminGuard = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);
  const role = roleService.get();

  if (role === 'Administrator') {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const UserGuard = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);
  const role = roleService.get();

  if (role === 'Basic User') {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const ManagerGuard = () => {
  // const roleService = inject(RoleService);
  // const router = inject(Router);
  // const role = roleService.get();
  // if (role === 'manager') {
  //   return true;
  // } else {
  //   router.navigateByUrl('/login');
  //   return false;
  // }

  return true;
};
