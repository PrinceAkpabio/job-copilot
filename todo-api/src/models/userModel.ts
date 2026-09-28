import pool from '../db';

export interface PublicUser {
    id: string;
    email: string;
    created_at: Date;
}

export async function createUser(email: string, passwordHash: string): Promise<PublicUser> {
    const results = await pool.query<PublicUser>('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at', [email, passwordHash]);
    return results.rows[0];
}

