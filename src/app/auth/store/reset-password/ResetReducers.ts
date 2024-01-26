import { createFeature, createReducer, on } from '@ngrx/store';
import { ResetState } from '../../types/reset-types';
import { ResetActions } from './ResetActions';

const initialState: ResetState = {
  isSubmitting: false,
  request: null,
  response: null,
  error: null,
};

const resetFeature = createFeature({
  name: 'reset',
  reducer: createReducer(
    initialState,
    on(ResetActions.sendOtp, (state, payload) => ({
      ...state,
      isSubmitting: true,
      request: payload,
      error: null,
    })),
    on(ResetActions.sendOtpSuccess, (state, payload) => ({
      ...state,
      isSubmitting: false,
      response: payload,
    })),
    on(ResetActions.sendOtpFailure, (state, payload) => ({
      ...state,
      isSubmitting: false,
      error: payload,
    })),
    on(ResetActions.resetPassword, (state, payload) => ({
      ...state,
      isSubmitting: true,
      request: payload,
      error: null,
    })),
    on(ResetActions.resetPasswordSuccess, (state, payload) => ({
      ...state,
      isSubmitting: false,
      response: payload,
    })),
    on(ResetActions.resetPasswordFailure, (state, payload) => ({
      ...state,
      isSubmitting: false,
      error: payload,
    }))
  ),
});

export const {
  name: resetFeatureKey,
  reducer: resetReducer,
  selectIsSubmitting,
  selectRequest,
  selectError,
  selectResponse,
} = resetFeature;
