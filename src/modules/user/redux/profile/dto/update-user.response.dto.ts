export type UpdateUserResponseDTO = {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
};

export const nullRawUpdateUserResponse: UpdateUserResponseDTO = {
  id: '',
  email: '',
  username: '',
  firstname: '',
  lastname: '',
};
