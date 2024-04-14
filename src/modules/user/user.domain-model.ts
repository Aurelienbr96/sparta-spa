import { Role, Roles } from '../common/constants/role.constants';

export namespace UserDomainModel {
  export type User = {
    id: number;
    email: string;
    role: Role;
    googleId?: string;
    referalCode?: string;
  };

  export const nullUser: User = {
    id: 0,
    email: '',
    role: Roles.coach,
  };
}
