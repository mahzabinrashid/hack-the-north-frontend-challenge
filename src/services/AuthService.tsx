class AuthService {
  private isLoggedIn = false;

  login(username: string, password: string): boolean {
    if (username === "admin" && password === "password") {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

export const authService = new AuthService();
