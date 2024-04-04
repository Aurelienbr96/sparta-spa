export type RegisterUserResponseDTO = {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
};

export type RegisterUserErrorDTO = {
  error: string;
  conflicts?: string[];
};
