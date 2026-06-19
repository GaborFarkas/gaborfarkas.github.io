import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from '@/app/app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { dateReviverInterceptorProvider } from '@/app/http-interceptors/date-reviver.interceptor';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding()), importProvidersFrom([BrowserModule]), provideHttpClient(withXhr(), withInterceptorsFromDi()), dateReviverInterceptorProvider]
};
