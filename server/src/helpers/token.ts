import JWT from 'jsonwebtoken';

const secret = 'secret';

type exp_end = 'h' | 'd' | 's';
type expiry<T extends string> = `${T}${exp_end}`;

export const genToken = <T extends Record<string, unknown>>(payload: T, expiry: expiry<string> = '5h') => {
  const token = JWT.sign(payload, secret, { expiresIn: expiry });
  return token;
};

export const decodeToken = <T>(token: string): T => {
  const payload = JWT.verify(token, secret) as T;
  return payload;
};