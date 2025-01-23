import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expire_in: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expire_in,
  });
};
