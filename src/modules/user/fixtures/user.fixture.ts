import { UserType } from '../types';

function buildAccounts() {
  const user: UserType = {
    id: 'id',
    email: 'user@user.com',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
  };

  return { user };
}

export const account = buildAccounts();
