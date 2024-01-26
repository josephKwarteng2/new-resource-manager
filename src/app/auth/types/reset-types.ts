import { CurrentUser } from '../../shared/types/types';

export type ResetState = {
  isSubmitting: boolean;
  request: {
    email?: string;
    OTP?: number;
  } | null;
  response: ResetPasswordResponse | SendOtpResponse | null;
  error: ResetPasswordError | SendOtpError | null;
};

export type SendOtp = {
  email: string;
};

export type SendOtpResponse = {
  message: string;
  isSubmitting: boolean;
  user: {
    email: string;
    userId: string;
  };
  OTP: number;
};

export type ResetPasswordRequest = {
  email: string;
  password_confirmation: string;
  password: string;
  otp: number;
};

export type ResetPasswordResponse = {
  message: string;
  accessToken: string;
  changePassword: boolean;
  user: CurrentUser;
};

export type ResetPasswordError = {
  message: string;
  access: string;
  error?: string;
};

export type SendOtpError = {
  error: string;
  message: string;
};
