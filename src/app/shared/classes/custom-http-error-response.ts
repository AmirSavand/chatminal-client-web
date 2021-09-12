import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '@app/shared/interfaces/api-error';

export class CustomHttpErrorResponse extends HttpErrorResponse {
  error: ApiError;
  preventSentryReport: boolean;
}
