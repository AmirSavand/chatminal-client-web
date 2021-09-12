import { AlertType } from '@modules/alert/shared/enums/alert-type.enum';

export interface AlertData {
  title?: string;
  message: string;
  type: AlertType;
}
