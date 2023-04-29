import { create } from 'zustand';
import { User } from '../utlis/getUserList';

interface authState {
  userSignedIn: boolean;
  signedInUser: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

export const useAuthStore = create<authState>()((set) => ({
  userSignedIn: false,
  signedInUser: null,
  signIn: (user) => set(() => ({ signedInUser: user, userSignedIn: true })),
  signOut: () => set(() => ({ signedInUser: null, userSignedIn: false })),
}));
