import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ResetActions } from './ResetActions';
import { catchError, map, switchMap, of, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetService } from '../../services/reset.service';
import { ResetToggleService } from '../../services/reset-toggle.service';
import { Router } from '@angular/router';

/**
 * Effect for sending otp to user's mail
 */
export const sendOtpEffect = createEffect(
  (actions$ = inject(Actions), resetService = inject(ResetService)) => {
    return actions$.pipe(
      ofType(ResetActions.sendOtp),
      switchMap(userDetails => {
        return resetService.postEmail(userDetails).pipe(
          map(response => {
            return ResetActions.sendOtpSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                ResetActions.sendOtpFailure({
                  error: 'There is an error with the service, please try again',
                  message:
                    'There is an error with the service, please try again',
                })
              );
            }
            return of(ResetActions.sendOtpFailure(error.error));
          })
        );
      })
    );
  },
  { functional: true }
);

/**
 * Effect for updating user credentials in the backend
 */
export const resetPasswordEffect = createEffect(
  (actions$ = inject(Actions), resetService = inject(ResetService)) => {
    return actions$.pipe(
      ofType(ResetActions.resetPassword),
      switchMap(userDetails => {
        return resetService.updatePassword(userDetails).pipe(
          map(response => {
            return ResetActions.resetPasswordSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
              return of(
                ResetActions.resetPasswordFailure({
                  message: 'Network error',
                  access: 'Denied',
                })
              );
            }
            return of(ResetActions.resetPasswordFailure(error.error));
          })
        );
      })
    );
  },
  { functional: true }
);

/**
 * Effect for changing email field to otp field after otp is sent
 */
export const changeEmailToOtp = createEffect(
  (actions$ = inject(Actions), toggleField = inject(ResetToggleService)) => {
    return actions$.pipe(
      ofType(ResetActions.sendOtpSuccess),
      tap({
        next: () => {
          const nextFormField = 'otp';
          toggleField.toggle(nextFormField);
        },
      })
    );
  },
  { functional: true, dispatch: false }
);

/**
 * Effect for redirecting to login after password
 */
export const redirectAfterReset = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(ResetActions.resetPasswordSuccess),
      tap({
        next: () => {
          setTimeout(() => {
            router.navigateByUrl('/login');
          }, 3000);
        },
      })
    );
  },
  { functional: true, dispatch: false }
);
