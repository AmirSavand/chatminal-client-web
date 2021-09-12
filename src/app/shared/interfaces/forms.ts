import { ReactiveFormData } from '@modules/micro/interfaces/reactive-form-data';

export interface Forms<T = any> {
  // If it has a value, that means it exists in databases.
  id?: number;
  form: ReactiveFormData<T>;
  children?: Forms[];
}
