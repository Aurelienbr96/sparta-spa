import { Roles } from '@app/modules/common/constants/role.constants';
import { LoginUserResponseDTO, UserToLoginDTO } from '../redux';
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

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

type FailureResponse = {
  error: FetchBaseQueryError;
  data?: undefined;
  meta?: FetchBaseQueryMeta | undefined;
};

function buildFailure() {
  const errorLoginResponse: FailureResponse = {
    error: {
      status: 401,
      data: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  };

  return { errorLoginResponse };
}

export const error = buildFailure();
export const response = buildResponse();
export const arg = buildArg();
