import { NextFunction, Request, Response } from "express";
import getModel from "../../models/appointments/factory";
import { StatusCodes } from 'http-status-codes';

export const getAllByGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointments = await getModel().getAllByGroup(+req.params.groupId);
        res.json(appointments);
    } catch (err) {
        next(err)
    }
}


export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAppointment = await getModel().add(req.body);
        res.status(StatusCodes.CREATED).json(newAppointment);
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().delete(+req.params.id);
        if (isDeleted) return res.sendStatus(StatusCodes.NO_CONTENT);
        res.status(StatusCodes.NOT_FOUND).json({success: false})
    } catch (err) {
        next(err)
    }
}