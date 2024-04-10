export type RegisterUserResponseDTO = {
  id: string;
  email: string;
  role: string;
};

export type RegisterUserErrorDTO = {
  error: string[];
  message?: string[];
  conflicts?: string[];
};
