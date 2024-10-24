import { Router } from "express";
import { check } from "express-validator";
import { toggleEstadoCampania, registrarCampania, verCampanias, verCampaniaPorId } from "../controllers/campaniasController";
import { validarJWT } from "../middlewares/validar-jwt";
import { RolId } from "../@types/rol.types";
const { validarCampos, validarRol } = require("../middlewares");

const campaniasRoutes = Router();

campaniasRoutes.get('/', verCampanias);

campaniasRoutes.get('/:idCampania', verCampaniaPorId);

campaniasRoutes.post('/registrar', [
    validarJWT,
    validarRol([RolId.Administrador]),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('titulo', 'El título tiene que ser menor a 150 caracteres').isLength({ max: 150 }),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción tiene que ser menor a 500 caracteres').isLength({ max: 500 }),
    validarCampos
], registrarCampania);

campaniasRoutes.put('/toggleEstado/:idCampania', [
    validarJWT,
    validarRol([RolId.Administrador]),
], toggleEstadoCampania);

export default campaniasRoutes;