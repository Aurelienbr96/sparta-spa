export type UserType = {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
};

export const nullUser: UserType = {
  id: '',
  email: '',
  username: '',
  firstname: '',
  lastname: '',
};
