import { createContext, Dispatch, SetStateAction } from "react";

export interface User {
  name: string;
  email: string;
  imageUrl: string;
}

export interface UserContextType {
  user: User | null; 
  
  setUser: Dispatch<SetStateAction<User | null>>; 
}

export const UserContext = createContext<UserContextType | null>(null);
