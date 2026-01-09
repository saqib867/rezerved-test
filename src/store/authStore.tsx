import { create } from "zustand";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;

  // setters
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;

  // actions
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  init: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (value) => set({ loading: value }),

  login: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  init: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
}));
