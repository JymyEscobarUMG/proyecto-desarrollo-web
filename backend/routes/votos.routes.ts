import { Router } from "express";
import { registrarVoto, verConteoVotosPorCampania } from "../controllers/votosController";
import { RolId } from "../@types/rol.types";
const { validarRol, validarJWT } = require("../middlewares");

const votosRoutes = Router();

votosRoutes.post('/registrar', [
    validarJWT,
    validarRol([RolId.Ingeniero]),
], registrarVoto);

votosRoutes.get('/verVotos/:idCampania', verConteoVotosPorCampania);

export default votosRoutes;