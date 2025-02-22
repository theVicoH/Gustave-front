import ApiService from '@/app/core/web/ApiService';

const api = new ApiService('/api');

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  status: "success" | "error";
  message?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Function to get CSRF token from cookies
function getXsrfTokenFromCookie(): string | null {
  const cookies = document.cookie.split(';');
  console.log('Cookies:', document.cookie);
  const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
  if (!xsrfCookie) return null;
  return decodeURIComponent(xsrfCookie.split('=')[1]);
}

// Function to get CSRF token
async function fetchCsrfToken(): Promise<void> {
  await api.get('/csrf', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    // First get CSRF token
    await fetchCsrfToken();
    const xsrfToken = getXsrfTokenFromCookie();
    
    // Then make login request with CSRF token
    const response = await api.post('/auth/login', data);

    if (response.status === 200 || response.status === 204) {
      return {
        status: "success",
        message: "Connexion réussie",
        user: response.user
      };
    }

    throw new Error(response.message || "Échec de la connexion");
  } catch (error: any) {
    console.error('Login error details:', error);
    
    if (error.status === 422) {
      throw new Error("Email ou mot de passe incorrect");
    }
    if (error.status === 429) {
      throw new Error("Trop de tentatives de connexion. Veuillez réessayer plus tard");
    }
    
    throw new Error(error.message || "Une erreur inattendue est survenue");
  }
}

export async function register(data: RegisterData): Promise<any> {
  try {
    // First get CSRF token
    await fetchCsrfToken();
    const xsrfToken = getXsrfTokenFromCookie();
    
    // Then make register request with CSRF token
    const response = await api.post('/auth/register', data, {
      headers: {
        'X-XSRF-TOKEN': xsrfToken || ''
      }
    });

    if (!response) {
      throw new Error("Échec de l'inscription");
    }

    return response;
  } catch (error) {
    console.error('Register error details:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Une erreur est survenue lors de l'inscription");
  }
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout', {});
}

export async function getUser() {
  return api.get('/auth/user');
}
