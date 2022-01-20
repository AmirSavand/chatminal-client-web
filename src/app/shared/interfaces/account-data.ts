export interface AccountData {
  id: number;
  email: string;
  token: string;
  user: Record<string, any>;
  rooms: Record<string, any>[];
}
