import { PK } from '@modules/micro/types/pk';

export interface IdName<IT = PK> {
  id: IT;
  name: string;
}
