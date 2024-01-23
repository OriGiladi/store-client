export type LoginRequest = {
    email: string,
    password: string
}

export type authActionError = {
    message: string
}

export const baseUrl = 'http://localhost:3000';