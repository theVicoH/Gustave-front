export interface ApiConfig {
  useWebEnvironment?: boolean;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
}