import { Role } from "../../schemas";

export interface JwtPayload {
  id: string;
  role: Role;
  iat?: number;
  exp?: number;
}