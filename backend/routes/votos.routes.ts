import { Router } from "express";
import { check } from "express-validator";
import { registrarVoto, verConteoVotosPorCampania } from "../controllers/votosController";
const { validarCampos } = require("../middlewares/validarCampos");

const votosRoutes = Router();

votosRoutes.post('/registrar', registrarVoto);

votosRoutes.get('/verVotos/:idCampania', verConteoVotosPorCampania);

export default votosRoutes;