import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { dateReviverInterceptorProvider } from '../http-interceptors/date-reviver.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(), importProvidersFrom([BrowserModule]), importProvidersFrom(HttpClientModule), dateReviverInterceptorProvider]
};
