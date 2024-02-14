class AuthService {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    window.addEventListener("storage", () => {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    });
  }

  private updateLoginState(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
    window.dispatchEvent(
      new CustomEvent("authChange", { detail: { isLoggedIn } })
    );
  }

  login(username: string, password: string): boolean {
    if (username === "admin" && password === "password") {
      this.updateLoginState(true);
      localStorage.removeItem("eventOrder");
      return true;
    }
    return false;
  }

  logout(): void {
    this.updateLoginState(false);
    localStorage.removeItem("eventOrder");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
  }
}

export const authService = new AuthService();
