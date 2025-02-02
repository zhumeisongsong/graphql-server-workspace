export interface AuthService {
  signIn(email: string, pass: string): Promise<void>;
}

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
