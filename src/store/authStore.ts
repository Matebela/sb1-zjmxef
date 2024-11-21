import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  
  login: (username: string, password: string) => {
    if (username === import.meta.env.VITE_AUTH_USERNAME && 
        password === import.meta.env.VITE_AUTH_PASSWORD) {
      set({ isAuthenticated: true, user: username });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  }
}));

export default useAuthStore;