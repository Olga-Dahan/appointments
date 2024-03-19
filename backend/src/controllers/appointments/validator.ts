import Joi from "joi"
import DTO from "../../models/appointments/dto"

export const addAppointmentValidator = Joi.object<DTO>({
    groupId: Joi.number().positive().required(),
    startAppointment: Joi.date().greater('now').required(),
    endAppointment: Joi.date().greater('now').required(),
    description: Joi.string().min(7).lowercase().required(),
    room: Joi.string().min(2).lowercase().required(),
});

