import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
}));

export default useAuthStore;
