import {Request, Response} from 'express';
import {createTodo, deleteTodo, listTodos, updateTodo} from '../models/todoModel';
import { getUserId } from '../middleware/requireAuth';

export async function create(req: Request, res: Response){
    const {title} = req.body ?? {};
    
    if(typeof title !== 'string' || !title.trim()) {
        res.status(400).json({error: 'Missing or invalid title'});
        return;
    }
    
    const todo = await createTodo(getUserId(req), title.trim());
    res.status(201).json(todo);

}

export async function list(req: Request, res: Response) {
    const todos = await listTodos(getUserId(req));
    res.status(200).json(todos)
}

export async function update(req: Request, res: Response) {
    const {title, completed} = req.body ?? {};

    if(title === undefined && completed === undefined) {
        res.status(400).json({error: 'Nothing to update'});
        return;
    }

    if(title !== undefined && (typeof title !== 'string' || !title.trim())) {
        res.status(400).json({error: 'Missing or invalid title'});
        return;
    }
    if(completed !== undefined && (typeof completed !== 'boolean')) {
        res.status(400).json({error: 'Missing or invalid completed'});
        return;
    }

    const updatedTodo = await updateTodo(req.params.id, getUserId(req), title?.trim() ?? null, completed ?? null);

    if(!updatedTodo) {
        res.status(404).json({error: 'Todo not found'});
        return;
    }

    res.status(200).json(updatedTodo);
}

export async function remove(req: Request, res: Response) {
    const {id} = req.params;

    const deleted = await deleteTodo(id, getUserId(req));

    if(!deleted) {
        res.status(404).json({error: 'Todo not found'});
        return;
    }

    res.status(204).send();
}