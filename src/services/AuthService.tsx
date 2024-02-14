class AuthService {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  }

  login(username: string, password: string): boolean {
    if (username === "admin" && password === "password") {
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.removeItem("eventOrder");
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("eventOrder");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
  }
}

export const authService = new AuthService();
