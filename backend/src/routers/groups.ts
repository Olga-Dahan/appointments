import { Router } from "express";
import { getAll } from "../controllers/groups/controller";

const router = Router();

router.get('/', getAll);

export default router;