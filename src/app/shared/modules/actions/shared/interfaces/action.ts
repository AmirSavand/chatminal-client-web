import { ActionValue } from '@modules/actions/shared/interfaces/action-value';

export interface Action {
  label: string;
  values?: ActionValue[];
}
