import { create } from "zustand";

interface StoreState {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  hasFilled: boolean;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setPassword: (setPassword: string) => void;
  setHasFilled: (hasFilled: boolean) => void;
}

export const useStoreRegister = create<StoreState>((set) => ({
  phone: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  hasFilled: false,
  setHasFilled: (hasFilled) => set({ hasFilled }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setPassword: (password) => set({ password }),
}));
