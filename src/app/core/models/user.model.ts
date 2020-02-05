import { Roles } from './roles.model';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  phone: string;
  balance: number;
  authorized: boolean;
  roles: Roles;
}
