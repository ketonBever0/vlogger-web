export interface User {
  id: string;
  email: string;
  password: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
  mobile?: string;
  role: 'admin' | 'user';
}