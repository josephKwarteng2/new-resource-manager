import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/authorization/AuthEffects';
import * as resetEffects from './auth/store/reset-password/ResetEffects';
import {
  authFeatureKey,
  authReducer,
} from './auth/store/authorization/AuthReducers';
import {
  resetFeatureKey,
  resetReducer,
} from './auth/store/reset-password/ResetReducers';
import { authInterceptor } from './auth/interceptors/authInterceptors';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(resetFeatureKey, resetReducer),
    provideEffects(authEffects, resetEffects),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
    }),
    provideAnimations()
],
};
