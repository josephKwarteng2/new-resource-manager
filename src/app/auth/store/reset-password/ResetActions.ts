import { createActionGroup, props } from '@ngrx/store';
import {
  ResetPasswordError,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendOtp,
  SendOtpError,
  SendOtpResponse,
} from '../../types/reset-types';

export const ResetActions = createActionGroup({
  source: 'reset',
  events: {
    SendOtp: props<SendOtp>(),
    SendOtpSuccess: props<SendOtpResponse>(),
    SendOtpFailure: props<SendOtpError>(),
    ResetPassword: props<ResetPasswordRequest>(),
    ResetPasswordSuccess: props<ResetPasswordResponse>(),
    ResetPasswordFailure: props<ResetPasswordError>(),
  },
});
