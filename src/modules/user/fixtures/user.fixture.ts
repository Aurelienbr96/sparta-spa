import { Roles } from '@app/modules/common/constants/role.constants';
import { UserType } from '../types';

function buildAccounts() {
  const user: UserType = {
    id: 'id',
    email: 'user@user.com',
    role: Roles.coach,
  };

  return { user };
}

export const account = buildAccounts();
