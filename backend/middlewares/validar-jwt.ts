import { NextFunction } from "express";
import pool from "../db/conexion";

const { response, request } = require('express');
const jwt = require('jsonwebtoken');


export const validarJWT = async (req = request, res = response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { idusuariosistema } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);        

        const usuarioExistente = await pool.query(
            `SELECT u.idusuariosistema, u.nombrecompleto, u.email, u.rolid, i.idingeniero
            FROM usuariosistema u LEFT JOIN ingeniero i ON u.idusuariosistema = i.usuariosistemaid
            WHERE idusuariosistema = $1`,
            [idusuariosistema]
        );

        if (usuarioExistente.rowCount == null || usuarioExistente.rowCount == 0) {
            res.status(401).json({ msg: 'Token no válido - usuario no existe DB' });
            return;
        }

        req.body.usuario = usuarioExistente.rows[0];
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}