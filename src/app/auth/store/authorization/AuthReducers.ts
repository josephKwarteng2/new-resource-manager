import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './AuthActions';
import { AuthState } from '../../types/auth-types';

const initialState: AuthState = {
  isSubmitting: false,
  login: {
    success: null,
    error: null,
    pending: false,
    message: '',
  },
  updateUserDetails: {
    success: null,
    pending: false,
    error: null,
  },
  updateUserPassword: {
    success: null,
    pending: false,
    error: null,
  },
  currentUser: null,
};

export type LoginState = typeof initialState.login;
export type UserPasswordState = typeof initialState.updateUserPassword;

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.login, (state, { successMessage, ...payload }) => ({
      ...state,
      login: {
        ...state.login,
        pending: true,
        error: null,
      },
    })),
    on(AuthActions.loginSuccess, (state, payload) => ({
      ...state,
      login: {
        ...state.login,
        pending: false,
        success: payload,
      },
      currentUser: payload.user,
    })),
    on(AuthActions.loginFailure, (state, payload) => ({
      ...state,
      login: {
        ...state.login,
        pending: false,
        error: payload,
      },
    })),
    on(AuthActions.updateUserPassword, (state, payload) => ({
      ...state,
      updateUserPassword: {
        ...state.updateUserPassword,
        pending: true,
        error: null,
      },
    })),
    on(AuthActions.updateUserDetailsSuccess, (state, payload) => ({
      ...state,
      updateUserPassword: {
        ...state.updateUserPassword,
        pending: false,
        error: null,
      },
      currentUser: payload.user,
    })),
    on(AuthActions.updateUserDetailsFailure, (state, payload) => ({
      ...state,
      updateUserPassword: {
        ...state.updateUserPassword,
        pending: false,
        error: payload,
      },
    })),
    on(AuthActions.updateUserDetails, (state, payload) => ({
      ...state,
      updateUserDetails: {
        ...state.updateUserDetails,
        pending: true,
        error: null,
      },
    })),
    on(AuthActions.updateUserDetailsSuccess, (state, payload) => ({
      ...state,
      updateUserDetails: {
        ...state.updateUserDetails,
        success: payload,
        pending: false,
        error: null,
      },
      currentUser: payload.user,
    })),
    on(AuthActions.updateUserDetailsFailure, (state, payload) => ({
      ...state,
      updateUserDetails: {
        ...state.updateUserDetails,
        pending: false,
        error: payload,
      },
    })),
    on(AuthActions.fetchCurrentUser, state => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })),
    on(AuthActions.fetchCurrentUserSuccess, (state, payload) => ({
      ...state,
      isSubmitting: false,
      currentUser: payload.user,
    })),
    on(AuthActions.fetchCurrentUserFailure, (state, payload) => ({
      ...state,
      isSubmitting: false,
      errors: payload,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectLogin,
  selectUpdateUserDetails,
  selectUpdateUserPassword,
  selectCurrentUser,
} = authFeature;
