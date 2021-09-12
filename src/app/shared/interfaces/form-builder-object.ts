import { ValidationErrors } from '@angular/forms';

export type FormBuilderObject<T> = {
  [P in keyof T]?: [any?, ValidationErrors?];
};
