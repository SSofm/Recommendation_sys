class AuthService {
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
