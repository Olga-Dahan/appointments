import { Router } from "express";
import { add, getAllByGroup, remove } from "../controllers/appointments/controller";
import validate from "../middlewares/input-validation";
import { addAppointmentValidator } from '../controllers/appointments/validator';

const router = Router();

router.get('/groups/:groupId', getAllByGroup);
router.post('/', validate(addAppointmentValidator) , add);
router.delete('/:id', remove);

export default router;