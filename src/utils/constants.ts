export const emailJsPublicKey = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
export const emailJsTemplateId = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID
export const emailJsServiceId = import.meta.env.VITE_EMAIL_JS_SERVICE_ID

export type LoginRequest = {
    email: string,
    password: string
}

export type authActionError = {
    message: string
}

export const baseUrl = 'http://localhost:3000';