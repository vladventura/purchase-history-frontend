export type AuthFormType = {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
};

export type ItemFormType = {
  name?: string;
  price?: number;
  cost?: number;
}

export type ItemErrorsType = {
  name: string | null;
  price: string | null;
  cost: string | null;
}

export type FormErrorsType = {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};
