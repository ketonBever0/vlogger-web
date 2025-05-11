import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  password: string;
  fullname: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  mobile?: string;
  description: string | null;
  role: 'admin' | 'user';
}