import { create } from 'zustand'

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

interface AuthStore {
  email: string;
  token: string | null;
  user: {
    profile:User | null;
  },
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  getToken: () => string | null;
  getUser: () => User | null;
}

export const useAuthStore = create<AuthStore>((set, get): AuthStore => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;

  return {
    email: '',
    token,
    user,
    isAuthenticated: !!token,
    setEmail: (email) => set({ email }),
    
    setAuth: (token, user) => {
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user: { profile: user }, isAuthenticated: true });
    },
    
    logout: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      set({ token: null, user:{profile: null}, isAuthenticated: false });
    },
    
    getToken: () => get().token,
    
    getUser: () => get().user?.profile,
  }
});