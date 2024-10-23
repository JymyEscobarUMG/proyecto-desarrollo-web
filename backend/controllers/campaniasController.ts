import { Request, Response } from "express";
import pool from "../db/conexion";
import { IregistrarCampania } from "../@types/campanias.types";

export const verCampanias = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT idcampania, titulo, descripcion, fechacreacion, fechafinalizacion, estadoid FROM Campania ORDER BY idCampania ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener campañas' });
    }
};

export const verCampaniaPorId = async (req: Request, res: Response) => {
    const { idCampania } = req.params;

    try {
        const result = await pool.query(
            'SELECT idcampania, titulo, descripcion, fechacreacion, fechafinalizacion, estadoid FROM Campania WHERE idcampania = $1 ORDER BY idCampania ASC',
            [idCampania]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener campañas' });
    }
};

export const registrarCampania = async (req: Request, res: Response) => {
    const { titulo, descripcion }: IregistrarCampania = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO campania (titulo, descripcion, estadoId ) VALUES ($1, $2, 1) RETURNING idcampania, titulo, descripcion; ',
            [titulo, descripcion]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al registrar campaña' });
    }
};

export const toggleEstadoCampania = async (req: Request, res: Response) => {
    const { idCampania } = req.params;

    try {
        // Obtener el estado actual de la campaña
        const result = await pool.query(
            'SELECT EstadoId FROM Campania WHERE IdCampania = $1',
            [idCampania]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ msg: 'Campaña no encontrada' });
            return;
        }

        const estadoActual = result.rows[0].estadoid;

        // Cambiar el estado de la campaña dependiendo del estado actual
        let nuevoEstado;
        let fechaFinalizacion;

        if (estadoActual === 1) {
            // Cambiar a "Finalizado"
            nuevoEstado = 2;
            fechaFinalizacion = new Date().toLocaleString("en-US", { timeZone: "America/Guatemala" }); // Asignar la fecha actual
        } else if (estadoActual === 2) {
            // Cambiar a "Activado"
            nuevoEstado = 1;
            fechaFinalizacion = null; // Limpiar la fecha de finalización
        } else {
            res.status(400).json({ msg: 'Estado no válido' });
            return;
        }

        // Actualizar la campaña con el nuevo estado y fecha de finalización
        const updateResult = await pool.query(
            'UPDATE campania SET estadoId = $1, fechafinalizacion = $2 WHERE idcampania = $3 RETURNING *;',
            [nuevoEstado, fechaFinalizacion, idCampania]
        );

        res.status(200).json(updateResult.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al cambiar estado de campaña' });
    }
};