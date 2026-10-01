import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')) {
        res.status(401).json({error: 'Missing or invalid token'});
        return;
    }

    const token = header.slice('Bearer '.length);

    let payload;

    try {
        payload = jwt.verify(token, JWT_SECRET, {algorithms: ['HS256']});
    } catch (error) {
        res.status(401).json({error: 'Missing or invalid token'});
        return
    }

    if(typeof payload === 'string' || !payload.sub) {
        res.status(401).json({error: 'Missing or invalid token'});
        return;
    }

    req.userId = payload.sub;
    next();
}

export function getUserId(req: Request): string {
    if(!req.userId) {
        throw new Error("getUserId called on a route without requireAuth");
    }
    return req.userId;
}