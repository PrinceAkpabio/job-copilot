import {Request, Response} from 'express';
import {createTodo, listTodos} from '../models/todoModel';

export async function create(req: Request, res: Response){
    const {title} = req.body ?? {};
    
    if(typeof title !== 'string' || !title.trim()) {
        res.status(400).json({error: 'Missing or invalid title'});
        return;
    }
    
    const todo = await createTodo(req.userId!, title.trim());
    res.status(201).json(todo);

}

export async function list(req: Request, res: Response) {
    const todos = await listTodos(req.userId!);
    res.status(200).json(todos)
}