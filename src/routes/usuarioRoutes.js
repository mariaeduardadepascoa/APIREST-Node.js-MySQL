import { Router } from "express";
import { criar, listar, atualizar, deletar } from "../controllers/usuarioControllers.js";

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.put("/:id", atualizar);
router.delete("/:id", deletar);

export default router;