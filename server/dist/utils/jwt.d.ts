import * as jwt from 'jsonwebtoken';
export declare const createJWT: ({ payload }: {
    payload: any;
}) => string;
export declare const createUserToken: ({ user }: {
    user: any;
}) => string;
export declare const isTokenValid: (token: string) => string | jwt.JwtPayload;
