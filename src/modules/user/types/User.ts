import { Role } from '@app/modules/common/constants/role.constants';

export type UserType = {
  email: string;
  googleId?: string;
  id: string;
  referalCode?: string;
  refresh?: string;
  role: Role | '';
};

export const nullUser: UserType = {
  id: '',
  email: '',
  role: '',
};
