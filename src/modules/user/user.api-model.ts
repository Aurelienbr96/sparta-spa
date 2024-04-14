import { Role } from '../common/constants/role.constants';
import { UserDomainModel } from './user.domain-model';

export namespace UserApiModel {
  export namespace Register {
    export type Input = {
      email: string;
      password: string;
      role: Role;
    };

    export type Output = UserDomainModel.User;
  }
  export namespace Login {
    export type Input = {
      password: string;
      email: string;
    };
    export type Output = UserDomainModel.User;
  }
  export namespace RefreshToken {
    export type Input = void;
    export type Output = UserDomainModel.User;
  }
  export namespace GoogleOauth {
    export type Input = {
      googleCredential: {
        clientId: string;
        credential: string;
        select_by: string;
      };
    };
    export type OutPut = UserDomainModel.User;
  }
}
