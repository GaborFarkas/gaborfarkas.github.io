import { Injectable, Provider } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * Parses ISO-8601 timestamps into Date objects.
 */
@Injectable()
export class DateReviverInterceptor implements HttpInterceptor {
    // ISO-8601 timestamp regex from https://gist.github.com/martinobordin/39bb1fe3400a29c1078dec00ff76bba9
    private iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (httpRequest.responseType === 'json') {
            // If the expected response type is JSON then handle it here.
            return next.handle(httpRequest).pipe(map(event => {
                if (event instanceof HttpResponse && typeof event.body === 'object') {
                    // Copy body and clone request instead of mutating.
                    const newBody = this.convertToDate({ ...event.body });
                    return event.clone({ body: newBody });
                }
                return event;
            }));
        } else {
            return next.handle(httpRequest);
        }
    }

    /**
     * Converts ISO-8601 timestamps to JS Date objects in any plain object.
     * @param body The plain object.
     */
    private convertToDate(body: Record<string, unknown>) {
        for (const key of Object.keys(body)) {
            const value = body[key];
            if (typeof value === 'string' && this.iso8601.test(value)) {
                body[key] = new Date(value);
            } else if (typeof value === 'object' && value !== null) {
                // Support deep conversion.
                this.convertToDate(value as Record<string, unknown>);
            }
        }
    }
}

/** Provider for the date reviver Interceptor. */
export const dateReviverInterceptorProvider: Provider =
    { provide: HTTP_INTERCEPTORS, useClass: DateReviverInterceptor, multi: true };
