export interface ApiConfig {
  headers?: Record<string, string>;
  skipXsrf?: boolean;
  useWebEnvironment?: boolean;  // Pour les routes sans /api
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}