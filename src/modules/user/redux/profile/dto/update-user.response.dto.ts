export type UpdateUserResponseDTO = {
  id: string;
  email: string;
  role: any;
};

export const nullRawUpdateUserResponse: UpdateUserResponseDTO = {
  id: '',
  email: '',
  role: '',
};
