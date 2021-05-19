export type FormType = {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
};

export type FormErrorsType = {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};
