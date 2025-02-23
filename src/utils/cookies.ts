export function extractCookies(headers: Record<string, string>) {
  const cookies = headers.cookie || "";
  const xsrfToken = cookies
    .split(';')
    .find(c => c.trim().startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  return {
    combinedCookies: cookies,
    xsrfToken: xsrfToken ? decodeURIComponent(decodeURIComponent(xsrfToken)) : null
  };
}
