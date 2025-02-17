interface CsrfTokens {
  xsrfToken: string;
  sessionToken: string;
}

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

export async function getCsrfTokens(): Promise<CsrfTokens> {
  // Vérifier si on a déjà des tokens valides
  const existingTokens = localStorage.getItem("csrf_tokens");
  const expirationTime = localStorage.getItem("csrf_tokens_expiration");

  if (existingTokens && expirationTime) {
    const isExpired = Date.now() > parseInt(expirationTime);
    if (!isExpired) {
      const [xsrfToken, sessionToken] = existingTokens.split(";");
      return {
        xsrfToken,
        sessionToken,
      };
    }
  }

  // Si pas de tokens ou expirés, en demander de nouveaux
  localStorage.removeItem("csrf_tokens");
  localStorage.removeItem("csrf_tokens_expiration");

  const response = await fetch("/api/csrf", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const cookies = data.cookies || "";

  const xsrfMatch = cookies.match(/XSRF-TOKEN=[^;]+/);
  const sessionMatch = cookies.match(/gustave_api_session=[^;]+/);

  const tokens = {
    xsrfToken: xsrfMatch ? xsrfMatch[0].split(";")[0] : "",
    sessionToken: sessionMatch ? sessionMatch[0].split(";")[0] : "",
  };
  console.log(document.cookie);
  // Stocker les tokens avec expiration (120 minutes)
  const expiresIn = 120 * 60 * 1000;
  localStorage.setItem(
    "csrf_tokens_expiration",
    (Date.now() + expiresIn).toString()
  );
  localStorage.setItem(
    "csrf_tokens",
    `${tokens.xsrfToken};${tokens.sessionToken}`
  );

  return tokens;
}

// Nouvelle fonction pour extraire le token XSRF
function getXsrfToken(): string | null {
  const tokens = localStorage.getItem("csrf_tokens");
  if (!tokens) return null;
  const [xsrfToken] = tokens.split(";");
  return xsrfToken.replace("XSRF-TOKEN=", "");
}

export async function login(data: LoginData): Promise<LoginResponse> {
  try {
    console.log("Cookies avant login:", document.cookie);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("Response from login:", responseData);
    console.log(
      "Headers React:",
      Object.fromEntries(response.headers.entries())
    );
    console.log("Cookies après login:", document.cookie);

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error("Email ou mot de passe incorrect");
      }
      if (response.status === 429) {
        throw new Error(
          "Trop de tentatives de connexion. Veuillez réessayer plus tard"
        );
      }
      throw new Error(
        responseData.message || "Une erreur est survenue lors de la connexion"
      );
    }

    // Vérifier si nous avons les données utilisateur
    if (!responseData || !responseData.status || !responseData.user) {
      throw new Error("Données utilisateur manquantes dans la réponse");
    }

    return {
      status: responseData.status,
      message: "Connexion réussie",
      user: responseData.user,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Une erreur inattendue est survenue");
  }
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export async function register(data: RegisterData) {
  await getCsrfTokens();
  const token = getXsrfToken();

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": token || "",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Registration failed");
  }

  return responseData;
}
