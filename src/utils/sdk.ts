export function extractParameterFromUrl(url: string): string | null {
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    return lastSegment || null;
}
export function getHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    }
    return headers
}
export function getHeadersWithJwt(userJwt: string) {
    const headers =  {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${userJwt}`
    }
    return headers
}
export function formatPrice(value: number, opts: { locale?: string; currency?: string } = {}) {
    const { locale = 'en-US', currency = 'USD' } = opts
    const formatter = new Intl.NumberFormat(locale, {
        currency,
        style: 'currency',
        maximumFractionDigits: 2,
    })
    return formatter.format(value)
}