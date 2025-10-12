export interface Environments {
  port: number;
  mongoURI: string;
  jwtSecret: string;
  corsOrigin: string;
  saltRound: number;
  expiresIn: string;
}
