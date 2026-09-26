import {Request, Response, NextFunction } from "express";

type AsyncRoute = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export function asyncHandler(handler: AsyncRoute) {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res, next).catch(next);
    }
}