import {JwtPayload} from 'jsonwebtoken';
import 'express';

declare module 'express-serve-static-core' {
    interface Request{
        user?:{
            id:string;
            email:string;
            role:'admin' | 'user' | 'doctor';
        };
    }
}