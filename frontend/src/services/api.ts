const API_URL = "http://localhost:8000/api";

// Tipos para autenticação
export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Gerenciamento de tokens
export const TokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refresh_token");
  },

  setTokens: (tokens: AuthTokens): void => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  },

  clearTokens: (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },
};

// Função para fazer requisições com token JWT
async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = TokenManager.getAccessToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(url, { ...options, headers });

  // Se o token expirou, tenta renovar
  if (response.status === 401 && TokenManager.getRefreshToken()) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${TokenManager.getAccessToken()}`;
      response = await fetch(url, { ...options, headers });
    } else {
      // Se não conseguir renovar, limpa os tokens e redireciona para login
      TokenManager.clearTokens();
      window.location.href = "/login";
    }
  }

  return response;
}

// Renova o access token usando o refresh token
async function refreshAccessToken(): Promise<boolean> {
  try {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) return false;

    const response = await fetch(`${API_URL}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// API de Autenticação
export const AuthApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao fazer login");
    }

    const data = await response.json();
    TokenManager.setTokens(data.tokens);
    return data;
  },

  register: async (
    email: string,
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.email?.[0] || error.username?.[0] || "Erro ao registrar");
    }

    const data = await response.json();
    TokenManager.setTokens(data.tokens);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (refreshToken) {
        await fetchWithAuth(`${API_URL}/auth/logout/`, {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } finally {
      TokenManager.clearTokens();
    }
  },

  me: async (): Promise<User> => {
    const response = await fetchWithAuth(`${API_URL}/auth/me/`);
    if (!response.ok) {
      throw new Error("Erro ao obter dados do usuário");
    }
    return response.json();
  },
};

// API de Alunos
import type { Aluno } from "../types/Aluno";
import { mapApiToAluno, mapAlunoToApi } from "../utils/alunoMapper";

export const AlunosApi = {
  listar: async (): Promise<Aluno[]> => {
    const response = await fetchWithAuth(`${API_URL}/alunos/`);
    if (!response.ok) {
      throw new Error("Erro ao listar alunos");
    }
    const data = await response.json();
    return Array.isArray(data) ? data.map(mapApiToAluno) : [];
  },

  detalhar: async (id: number): Promise<Aluno> => {
    const response = await fetchWithAuth(`${API_URL}/alunos/${id}/`);
    if (!response.ok) {
      throw new Error("Erro ao obter aluno");
    }
    const data = await response.json();
    return mapApiToAluno(data);
  },

  criar: async (aluno: Omit<Aluno, "id">): Promise<Aluno> => {
    const response = await fetchWithAuth(`${API_URL}/alunos/`, {
      method: "POST",
      body: JSON.stringify(mapAlunoToApi(aluno)),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao criar aluno");
    }

    const data = await response.json();
    return mapApiToAluno(data);
  },

  atualizar: async (id: number, aluno: Partial<Aluno>): Promise<Aluno> => {
    const response = await fetchWithAuth(`${API_URL}/alunos/${id}/`, {
      method: "PUT",
      body: JSON.stringify(mapAlunoToApi(aluno)),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao atualizar aluno");
    }

    const data = await response.json();
    return mapApiToAluno(data);
  },

  deletar: async (id: number): Promise<void> => {
    const response = await fetchWithAuth(`${API_URL}/alunos/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar aluno");
    }
  },

  porEscola: async (escola: string): Promise<Aluno[]> => {
    const response = await fetchWithAuth(
      `${API_URL}/alunos/por_escola/?escola=${encodeURIComponent(escola)}`
    );
    if (!response.ok) {
      throw new Error("Erro ao listar alunos por escola");
    }
    const data = await response.json();
    return Array.isArray(data) ? data.map(mapApiToAluno) : [];
  },

  porTurno: async (turno: string): Promise<Aluno[]> => {
    const response = await fetchWithAuth(
      `${API_URL}/alunos/por_turno/?turno=${encodeURIComponent(turno)}`
    );
    if (!response.ok) {
      throw new Error("Erro ao listar alunos por turno");
    }
    const data = await response.json();
    return Array.isArray(data) ? data.map(mapApiToAluno) : [];
  },

  estatisticas: async (): Promise<{
    total_alunos: number;
    por_turno: Record<string, number>;
    por_tipo: Record<string, number>;
    por_forma_pagamento: Record<string, number>;
  }> => {
    const response = await fetchWithAuth(`${API_URL}/alunos/estatisticas/`);
    if (!response.ok) {
      throw new Error("Erro ao obter estatísticas");
    }
    return response.json();
  },
};
