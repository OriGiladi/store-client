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