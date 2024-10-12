import { Router } from "express";
import { check } from "express-validator";
import { toggleEstadoCampania, registrarCampania, verCampanias } from "../controllers/campaniasController";
const { validarCampos } = require("../middlewares/validarCampos");

const campaniasRoutes = Router();

campaniasRoutes.get('/', verCampanias);

campaniasRoutes.post('/registrar', registrarCampania);

campaniasRoutes.put('/toggleEstado/:idCampania', toggleEstadoCampania);

export default campaniasRoutes;