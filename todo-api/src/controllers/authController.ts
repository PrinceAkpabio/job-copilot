import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {createUser, findUserByEmail} from '../models/userModel';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config';

const BCRYPT_COST = 12;
const UNIQUE_VIOLATION = '23505';
const DUMMY_HASH = bcrypt.hashSync('dummy-password', BCRYPT_COST);

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

export async function login(req: Request, res: Response) {
    const { email, password } = req.body ?? {};

    if(typeof email !== 'string' || typeof password !== 'string') {
        res.status(400).json({error: 'Email or Password must be a string'});
        return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    const passwordHashToCheck = user ? user.password_hash : DUMMY_HASH;
    const comparedPassword = await bcrypt.compare(password, passwordHashToCheck);

    if(!user || !comparedPassword) {
        res.status(401).json({error: 'Invalid email or password'});
        return;
    }

    const token = jwt.sign({sub: user.id}, JWT_SECRET, {expiresIn: '1h'})
    res.status(200).json({token});
    return;
}