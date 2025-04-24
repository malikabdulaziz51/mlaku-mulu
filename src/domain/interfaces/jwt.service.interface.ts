export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  touristId?: number;
  [key: string]: any;
}

export interface IJwtService {
  sign(payload: JwtPayload): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
}
