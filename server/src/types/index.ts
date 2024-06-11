export type TokenUser = {
  sub: string;
  email: string;
  username: string;
};

declare global {
  namespace Express {
    interface Locals {
      user: TokenUser
    }
  }
}
