import * as jwt from 'jsonwebtoken';

export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
};

export const createUserToken = ({ user }) => {
  const payload = {
    sub: user._id,
  }
  return createJWT({ payload });
};

export const isTokenValid = ( token: string ) => jwt.verify(token, process.env.JWT_SECRET as string);



