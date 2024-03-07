export const EMAIL_JS_PUBLIC_KEY = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
export const EMAIL_JS_TEMPLATE_ID = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID
export const EMAIL_JS_SERVICE_ID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID
export const BASE_URL = 'http://localhost:3000';
export const NOT_FOUND_STATUS_CODE = 404;
export const UNAUTHORIZED_STATUS_CODE = 401;
export const CONFIRMATION_CODE_LENGTH = 6;
export const userRole = {
    user: 'USER',
    admin: 'ADMIN'
}
export const currency = "ILS"
export const paypalInitialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: currency,
    intent: "capture",
};