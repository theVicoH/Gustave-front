interface RequestOptions {
    headers?: Record<string, string>;
}

interface ApiError {
    status: number;
    message: string;
    details?: any;
}

class ApiService {
    private baseUrl: string;
    private xsrfToken: string | null = null;
    private endpoint: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async makeRequest<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        options?: RequestOptions,
        body?: any
    ): Promise<T> {
        try {
            this.endpoint = endpoint;
            if (body) console.log('Request body:', body);

            const headers = await this.getHeaders(options);

            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method,
                headers,
                credentials: 'include',
                ...(body && { body: JSON.stringify(body) })
            });

            return this.handleResponse(response);
        } catch (error) {
            this.handleRequestError(error);
        }
    }

    private handleRequestError(error: unknown): never {
        console.error('Request error:', error);
        throw {
            status: 500,
            message: error instanceof Error ? error.message : 'Network error occurred',
            details: error
        } as ApiError;
    }

    private handleCsrfMismatch(): void {
        console.warn('CSRF token mismatch detected - clearing cookies and redirecting to login');
        this.clearAllCookies();
        window.location.href = '/auth/login';
    }

    private clearAllCookies(): void {
        document.cookie.split(';').forEach(cookie => {
            const [name] = cookie.split('=');
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        });
    }

    private async handleResponse(response: Response): Promise<any> {
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            await this.handleErrorResponse(response);
        }

        return this.parseResponse(response);
    }

    private async handleErrorResponse(response: Response): Promise<never> {
        try {
            const errorData = await response.json();
            console.error('Error data:', errorData);

            if (errorData.message?.toLowerCase().includes('csrf token mismatch')) {
                this.handleCsrfMismatch();
                throw { status: 401, message: 'CSRF token mismatch', details: null } as ApiError;
            }

            throw {
                status: response.status,
                message: errorData.message || 'An error occurred',
                details: errorData.details || null
            } as ApiError;
        } catch {
            throw {
                status: response.status,
                message: `HTTP Error: ${response.status} ${response.statusText}`,
                details: null
            } as ApiError;
        }
    }

    private async parseResponse(response: Response): Promise<any> {
        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');

        if (contentLength === '0' || !contentType?.includes('application/json')) {
            return { status: response.status };
        }

        try {
            const jsonData = await response.json();
            console.log('Response data:', jsonData);
            return jsonData;
        } catch (e) {
            console.error('Error parsing JSON response:', e);
            return { status: response.status };
        }
    }

    private getXsrfToken(): string | null {
        const cookies = document.cookie.split(';');
        const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
        if (!xsrfCookie) return null;
        
        const tokenValue = xsrfCookie.split('=')[1];
        return decodeURIComponent(tokenValue);
    }

    private async getHeaders(options?: RequestOptions): Promise<Headers> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(options?.headers || {})
        });

        const xsrfToken = this.getXsrfToken();

        if (xsrfToken) {
            headers.append('X-XSRF-TOKEN', xsrfToken);
        }

        return headers;
    }

    // Public API methods
    public async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.makeRequest<T>('GET', endpoint, options);
    }

    public async post<T>(endpoint: string, body: any, options?: RequestOptions): Promise<T> {
        return this.makeRequest<T>('POST', endpoint, options, body);
    }

    public async put<T>(endpoint: string, body: any, options?: RequestOptions): Promise<T> {
        return this.makeRequest<T>('PUT', endpoint, options, body);
    }

    public async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.makeRequest<T>('DELETE', endpoint, options);
    }
}

export default ApiService;