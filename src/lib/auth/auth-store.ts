type AuthListener = (user: AuthUser | null) => void;

interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  role: string;
}

let _user: AuthUser | null = null;
const _listeners = new Set<AuthListener>();

function notify() {
  _listeners.forEach((fn) => fn(_user));
}

export const authStore = {
  getUser(): AuthUser | null {
    return _user;
  },
  setUser(u: AuthUser | null) {
    _user = u;
    if (typeof window !== "undefined") {
      if (u) {
        localStorage.setItem("aruca_auth", JSON.stringify(u));
      } else {
        localStorage.removeItem("aruca_auth");
      }
    }
    notify();
  },
  subscribe(fn: AuthListener) {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
  loadFromStorage(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const cached = localStorage.getItem("aruca_auth");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return null;
  },
};
