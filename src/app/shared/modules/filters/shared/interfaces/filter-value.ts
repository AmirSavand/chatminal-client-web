import { PK } from '@modules/micro/types/pk';

export interface FilterValue<T = PK> {
  id: T;
  name: string;
  info?: string;
}
