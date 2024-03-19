import { NextFunction, Request, Response } from "express";
import getModel from "../../models/groups/factory";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await getModel().getAll();
        res.json(groups);
    } catch (err) {
        next(err)
    }
}