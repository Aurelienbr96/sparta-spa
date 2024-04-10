import { Roles } from '@app/modules/common/constants/role.constants';
import { LoginUserResponseDTO, UserToLoginDTO } from '../redux';

function buildResponse() {
  const successful: LoginUserResponseDTO = {
    id: 'id',
    email: 'user@user.com',
    role: Roles.coach,
  };

  return { successful };
}

function buildArg() {
  const user: UserToLoginDTO = {
    email: 'user@user.com',
    password: 'password',
  };

  return { user };
}

export const response = buildResponse();
export const arg = buildArg();
