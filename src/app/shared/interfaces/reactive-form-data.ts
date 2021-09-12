import { FormGroup } from '@angular/forms';
import { ApiError } from '@app/shared/interfaces/api-error';

/**
 * Reactive form object for API.
 *
 * @version 2021.1.27
 */
export interface ReactiveFormData<T = any> {
  /* Actual API ID. Used for knowing if it's for edit or create. */
  id?: number;
  /* Form group data for this object. */
  form?: FormGroup;
  /* Used for API loading indicator. */
  loading?: boolean;
  /* Used for error reporting. */
  error: ApiError;
  /* Used to know about certain errors. */
  errorStatus?: number;
  /* Used to know if API call is succeeded. */
  success?: boolean;
  /* Raw data of this form actual object from API. */
  data?: T;
  /* Whether or not this for is in view mode. */
  viewMode?: boolean;
}
