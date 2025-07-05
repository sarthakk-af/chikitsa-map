import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request , Response , NextFunction} from 'express';

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyToken = ( req:Request , res:Response , next:NextFunction ) :void=> {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
         res.status(401).json({error:"Access denied . No token provided."});
         return;
    }

    const token = authHeader.split(' ')[1];

    try {

        type JwtPayloadWithRole ={
            id:string;
            email:string;
            role:'admin' | 'user' | 'doctor';
        };
        const decoded = jwt.verify (token, JWT_SECRET) as JwtPayloadWithRole;
        req.user = decoded;
        next();

        console.log(req.user?.role); 

    }catch(error){
         res.status(400).json({error:'Invalid Token'});
         return;
    }
}