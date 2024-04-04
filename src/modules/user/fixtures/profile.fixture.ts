import { UpdateUserResponseDTO, UserToUpdateDTO } from '../redux';

function buildResponse() {
  const successful: UpdateUserResponseDTO = {
    id: 'id',
    email: 'user@user.com',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
  };

  return { successful };
}

function buildArg() {
  const user: UserToUpdateDTO = {
    id: 'id',
    firstname: 'updated-firstname',
    lastname: 'updated-lastname',
    username: 'updated-usersname',
  };

  return { user };
}

export const response = buildResponse();
export const arg = buildArg();
