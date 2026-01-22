import { create } from "zustand";
import { api } from "@/lib/axios";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: {
    url:string,
    publicId:string
  }
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;

  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/user/get-current-user"); 

      set({
        user: res.data || null,
        loading: false,
      });
    } catch (err: any) {
      set({
        user: null,
        loading: false,
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch user",
      });
    }
  },

  logout: async () => {
    try {
      await api.post("/user/logout");
    } catch {}

    set({ user: null });
  },
}));
