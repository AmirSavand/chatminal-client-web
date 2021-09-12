import { PK } from '@modules/micro/types/pk';
import { FilterType } from '../enums/filter-type';
import { FilterValue } from './filter-value';

export interface Filter<T = PK> {
  type: FilterType;
  label: string;
  key: string;
  value: string | boolean | number;
  values?: FilterValue<T>[];
}
