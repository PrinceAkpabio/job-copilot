import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {createUser} from '../models/userModel';

const BCRYPT_COST = 12;
const UNIQUE_VIOLATION = '23505';

export async function register(req: Request, res: Response) {
    const {email, password} = req.body ?? {};

    if(typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({error: 'Email must be a string and valid'});
        return ;
    }

    if(typeof password !== 'string' || password.length < 8 ) {
        res.status(400).json({error: 'Password must be a string and at least 8 characters'});
        return 
    }

    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, BCRYPT_COST);

    try {
        const user = await createUser(normalizedEmail, passwordHash);
        res.status(201).json(user);
    } catch (error) {
        if((error as {code?: string}).code === UNIQUE_VIOLATION) {
            res.status(409).json({error: 'Email already registered'});
            return;
        }
        throw error;
    }
}