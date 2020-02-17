import { Roles } from './roles.model';

export interface UserData {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  balance: number;
  roles: Roles;
}
