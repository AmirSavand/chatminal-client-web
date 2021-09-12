/**
 * Standard API error response
 */
export interface ApiError {
  [propName: string]: string | string[] | any;

  non_field_errors?: string[];
  detail?: string;
}
