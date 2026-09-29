import pool from '../db';

export interface PublicUser {
    id: string;
    email: string;
    created_at: Date;
}
export interface UserWithHash {
    id: string;
    email: string;
    password_hash: string;
}

export async function createUser(email: string, passwordHash: string): Promise<PublicUser> {
    const results = await pool.query<PublicUser>('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at', [email, passwordHash]);
    return results.rows[0];
}

export async function findUserByEmail(email: string): Promise<UserWithHash | undefined> {
    const results = await pool.query<UserWithHash>('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
    return results.rows[0];
}

