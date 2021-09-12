import { User } from '@app/shared/interfaces/user';

export interface AuthResponse {
  user: User;
  token: string;
}
