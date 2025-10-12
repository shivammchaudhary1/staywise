export enum UserRole {
  User = "user",
  Admin = "admin",
}

export interface userModel {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
