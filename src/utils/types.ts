export type LoginRequest = {
    email: string,
    password: string
}
export type authActionError = {
    message: string
}
export type registrationActionError = {
    validationMessage: {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }
}