export type FormType = {
    username: string,
    password: string,
    email?: string,
    confirmPassword?: string
}

export type UserData = {
    data: {
        register: User;
    };
}