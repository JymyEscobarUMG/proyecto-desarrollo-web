import { Router } from "express";
import { check } from "express-validator";
import { buscarPorColegiado, eliminarCandidato, registrarCandidato, verCandidatos, verCandidatosPorCampania } from "../controllers/candidatosController";
import { RolId } from "../@types/rol.types";
const { validarCampos, validarJWT, validarRol } = require("../middlewares");

const candidatosRoutes = Router();

candidatosRoutes.get('/buscarColegiado/:numeroColegiado', [
    check('numeroColegiado', 'El numero de colegiado es obligatorio').not().isEmpty(),
    validarCampos
], buscarPorColegiado);

candidatosRoutes.get('/', verCandidatos);

candidatosRoutes.get('/:idCampania', verCandidatosPorCampania);

candidatosRoutes.post('/registrar', [
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('campaniaId', 'El campaniaId no es válido').isNumeric(),
    check('ingenieroId', 'El ingenieroId no es válido').isNumeric(),
    validarCampos
], registrarCandidato);

candidatosRoutes.delete('/eliminar/:idCandidato', [
    validarJWT,
    //validarRol([RolId.Administrador]),
], eliminarCandidato);

export default candidatosRoutes;