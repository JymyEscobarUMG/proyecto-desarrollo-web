import { Router } from "express";
import { getUsuarios, postLoginInge, postLoginAdmin, postRegistrarInge, postRegistrarAdmin, revalidarToken } from "../controllers/usuariosController";
import { check } from "express-validator";
const { validarCampos, validarJWT } = require("../middlewares");

const userRoutes = Router();


userRoutes.get('/', getUsuarios);

userRoutes.post('/loginIngeniero', [
    check('numeroColegiado', 'El numero de colegiado es obligatorio').not().isEmpty(),
    check('dpi', 'El DPI no es válido').isNumeric().isLength({ min: 13, max: 13 }),
    check('fechaNacimiento', 'La fecha de nacimiento no es válida').matches(/^(\d{4})[-|/](0[1-9]|1[0-2])[-|/](0[1-9]|[12][0-9]|3[01])$/),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], postLoginInge);

userRoutes.post('/loginAdmin', [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], postLoginAdmin);

userRoutes.post('/registrarIngeniero', [
    check('numeroColegiado', 'El numero de colegiado es obligatorio').not().isEmpty(),
    check('dpi', 'El DPI no es válido').isNumeric().isLength({ min: 13, max: 13 }),
    check('fechaNacimiento', 'La fecha de nacimiento no es válida').matches(/^(\d{4})[-|/](0[1-9]|1[0-2])[-|/](0[1-9]|[12][0-9]|3[01])$/),
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    validarCampos
], postRegistrarInge);

userRoutes.post('/registrarAdministrador', [
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    validarCampos
], postRegistrarAdmin);

userRoutes.get('/validarToken', validarJWT, revalidarToken);

export default userRoutes;

