import { ApiConfig, ApiError, ErrorResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

interface ApiConfig {
  headers?: Record<string, string>;
  useWebEnvironment?: boolean;
  rawResponse?: boolean;
}

export class NextApiService {
  private getBaseUrl(useWebEnvironment: boolean = false): string {
    return useWebEnvironment
      ? process.env.API_WEB_ENVIRONNEMENT_URL
      : process.env.API_ENVIRONMENT_URL;
  }

  private async handleErrorResponse(response: Response): Promise<ApiError> {
    let errorResponse: ErrorResponse = {
      message: response.statusText || "Unexpected server error",
      code: "UNKNOWN_ERROR",
    };

    try {
      const json = await response.clone().json();
      errorResponse = { ...errorResponse, ...json };
    } catch {
      console.warn("Échec du parsing du JSON d'erreur.");
    }

    return new ApiError(
      response.status,
      errorResponse.message,
      errorResponse.code,
      errorResponse.details
    );
  }

  private buildHeaders(
    config: ApiConfig = {},
    originalRequest?: Request,
    body?: any
  ): Headers {
    const headers = new Headers({
      Accept: "application/json",
      ...config.headers,
    });

    // Handle Content-Type header
    if (body) {
      if (body instanceof FormData) {
        headers.delete("Content-Type");
      } else {
        headers.set("Content-Type", "application/json");
      }
    }

    if (originalRequest) {
      originalRequest.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (!["content-type", "content-length"].includes(lowerKey)) {
          headers.set(key, value);
        }
      });
    }

    return headers;
  }

  public async request<T>(
    endpoint: string,
    method: string,
    config: ApiConfig = {},
    body?: any,
    originalRequest?: Request
  ): Promise<Response> {
    try {
      const baseUrl = this.getBaseUrl(config.useWebEnvironment);
      const url = `${baseUrl}${endpoint}`;
      const headers = this.buildHeaders(config, originalRequest, body);

      console.log(`[NextApiService] Requête ${method} vers ${url}`);

      const response = await fetch(url, {
        method,
        headers,
        credentials: "include",
        body:
          body instanceof FormData
            ? body
            : body
            ? JSON.stringify(body)
            : undefined,
      });

      if (!response.ok) {
        const error = await this.handleErrorResponse(response);
        return this.createErrorResponse(
          error.status,
          error.message,
          error.code,
          error.details
        );
      }

      if (config.rawResponse) {
        return response;
      }

      return this.createNextResponseWithHeaders(response);
    } catch (error) {
      console.error("[NextApiService] Erreur lors de la requête:", error);
      return this.createErrorResponse(
        500,
        "Request failed",
        "REQUEST_ERROR",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  public async get<T>(
    endpoint: string,
    config?: ApiConfig,
    request?: Request
  ): Promise<Response> {
    return this.request<T>(endpoint, "GET", config, undefined, request);
  }

  public async post<T>(
    endpoint: string,
    body: any,
    config?: ApiConfig,
    request?: Request
  ): Promise<Response> {
    return this.request<T>(endpoint, "POST", config, body, request);
  }

  public async put<T>(
    endpoint: string,
    body: any,
    config?: ApiConfig,
    request?: Request
  ): Promise<Response> {
    return this.request<T>(endpoint, "PUT", config, body, request);
  }

  public async delete<T>(
    endpoint: string,
    config?: ApiConfig,
    request?: Request
  ): Promise<Response> {
    return this.request<T>(endpoint, "DELETE", config, undefined, request);
  }

  private async createNextResponseWithHeaders(
    response: Response
  ): Promise<Response> {
    const headers = Object.fromEntries(
      Array.from(response.headers.entries()).filter(
        ([key]) =>
          !["content-length", "content-type"].includes(key.toLowerCase())
      )
    );

    if (
      response.status === 204 ||
      response.headers.get("Content-Length") === "0"
    ) {
      return new Response(null, {
        status: 204,
        headers: response.headers,
      });
    }

    try {
      const data = await response.json();

      return NextResponse.json(data, {
        status: response.status,
        headers,
      });
    } catch (error) {
      console.warn(
        "[NextApiService] Échec du parsing de la réponse JSON:",
        error
      );
      return NextResponse.json(null, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          "Content-Length": "0",
        },
      });
    }
  }

  private createErrorResponse(
    status: number,
    message: string,
    code: string = "UNKNOWN_ERROR",
    details?: any,
    originalHeaders?: Headers
  ): Response {
    const errorBody: ErrorResponse = {
      message,
      code,
      details,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (originalHeaders) {
      originalHeaders.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (!["content-type", "content-length"].includes(lowerKey)) {
          headers[key] = value;
        }
      });
    }

    return NextResponse.json(errorBody, {
      status,
      headers,
    });
  }
}
