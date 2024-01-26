import { inject } from '@angular/core';
import { AccesstokenService } from '../../shared/services/accesstoken.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

/**
 * Simple auth guard that just checks for access token
 *
 * updated to allow access for account setup
 */

export const AuthGuard = () => {
  const tokenService = inject(AccesstokenService);
  const router = inject(Router);

  return (route: ActivatedRouteSnapshot) => {
    const token = tokenService.get();
    const accesstoken = route.params['accesstoken'];
    const mail = route.params['email'];
    const userId = route.params['userId'];

    if (token || (accesstoken && mail && userId)) {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  };
};

// export const AuthGuard = () => {
//   const tokenService = inject(AccesstokenService);
//   const router = inject(Router);

//   const token = tokenService.get();
//   if (token) {
//     return true;
//   } else {
//     router.navigateByUrl('/login');
//     return false;
//   }
// };

/**
 * Using the async CurrentUserService which tries to fetch data
 * @returns logged in user
 */
// export const AuthGuard = () => {
//   const currentUserService = inject(CurrentUserService);
//   const router = inject(Router);

//   return currentUserService.currentUser$.pipe(
//     filter((currentUser) => currentUser !== undefined),
//     map((currentUser) => {
//       if (!currentUser) {
//         router.navigateByUrl('/register');
//         return false;
//       }
//       return true;
//     })
//   );
// };
