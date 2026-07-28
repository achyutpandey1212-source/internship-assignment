const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export const tokenStorage = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  getUser: (): { id: string; email: string } | null => {
    const stored = localStorage.getItem(TOKEN_KEYS.USER);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
  },

  setUser: (user: { id: string; email: string }): void => {
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
  },

  clearAll: (): void => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
  },

  hasTokens: (): boolean => {
    return !!tokenStorage.getAccessToken() && !!tokenStorage.getRefreshToken();
  },
};
