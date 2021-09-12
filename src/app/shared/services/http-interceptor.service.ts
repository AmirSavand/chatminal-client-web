import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  /**
   * @param request The outgoing request to handle
   * @param next The next interceptor in the chain, or the backend if no interceptors in the chain.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse): Observable<never> => {
      /**
       * For these permission errors let's sign the user out and redirect
       * them so they can reauthenticate.
       */
      if ([401, 403].includes(error.status)) {
        alert('You do not have permission to do this action, please sign in again.')
      }
      /**
       * For these general errors, we want to show a general error
       * message to the user.
       */
      if ([0, 500].includes(error.status)) {
        alert('Oh! Something gone wrong on our servers.');
      }
      return throwError(error);
    }));
  }
}
