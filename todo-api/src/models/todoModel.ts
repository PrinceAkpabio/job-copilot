import pool from '../db';

export interface Todo {
    id: string;
    user_id: string;
    title: string;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
}

export async function createTodo(userId: string, title: string): Promise<Todo>{
    const result = await pool.query<Todo>('INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *', [userId, title]);
    return result.rows[0]
}

export async function listTodos(userId: string): Promise<Todo[]> {
    const result = await pool.query<Todo>('SELECT id, user_id, title, completed, created_at, updated_at FROM todos WHERE user_id=$1 ORDER BY created_at DESC', [userId]);
    return result.rows;
}

export async function updateTodo(id: string, userId: string, title: string | null, completed: boolean | null): Promise<Todo | undefined> {
    const results = await pool.query<Todo>('UPDATE todos SET title=COALESCE($3, title), completed=COALESCE($4, completed), updated_at=now() WHERE id=$1 AND user_id=$2 RETURNING *', [id, userId, title, completed]);
    return results.rows[0];
} 

export async function deleteTodo(id:string, userId: string): Promise<boolean>{
    const results = await pool.query('DELETE FROM todos WHERE id=$1 AND user_id=$2', [id, userId]);
    return (results.rowCount ?? 0) > 0;
}