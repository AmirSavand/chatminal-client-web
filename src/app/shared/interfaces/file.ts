import { FileGroup } from '@app/shared/enums/file-group';

export interface File {
  name: string;
  url: string;
  type: string;
  group: FileGroup;
  size: number;
}
