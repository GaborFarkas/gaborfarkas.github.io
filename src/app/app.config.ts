import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from '@/app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { dateReviverInterceptorProvider } from '@/http-interceptors/date-reviver.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(), importProvidersFrom([BrowserModule]), provideHttpClient(withInterceptorsFromDi()), dateReviverInterceptorProvider]
};
