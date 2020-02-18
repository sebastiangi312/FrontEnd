import { Roles } from './roles.model';

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  balance: number;
  roles: Roles;
}
