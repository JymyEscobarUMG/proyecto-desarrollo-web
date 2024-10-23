import { Request, Response } from "express";
import pool from "../db/conexion";
import { IquerybuscarColegiado, IregistrarCandidato } from "../@types/candidatos.types";

export const buscarPorColegiado = async (req: Request, res: Response) => {
    const { numeroColegiado } = req.params;

    try {
        const result = await pool.query(
            `SELECT i.IdIngeniero, u.NombreCompleto, i.Dpi, i.FechaNacimiento 
            FROM Ingeniero i JOIN UsuarioSistema u ON i.UsuarioSistemaId = u.IdUsuarioSistema 
            WHERE i.NumeroColegiado = $1`,
            [numeroColegiado]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ msg: 'Ingeniero no encontrado' });
            return;
        }

        const colegiado: IquerybuscarColegiado = result.rows[0];
        res.status(200).json(colegiado);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al buscar ingeniero' });
    }
};

export const verCandidatos = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT c.IdCandidato, c.Descripcion, c.NumTotalVotos, ca.Titulo AS Campania, u.NombreCompleto AS Ingeniero
            FROM Candidato c
            JOIN Campania ca ON c.CampaniaId = ca.IdCampania
            JOIN Ingeniero i ON c.IngenieroId = i.IdIngeniero
            JOIN UsuarioSistema u ON i.UsuarioSistemaId = u.IdUsuarioSistema`
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener candidatos' });
    }
};

export const verCandidatosPorCampania = async (req: Request, res: Response) => {
    const { idCampania } = req.params;
    try {
        const result = await pool.query(
            `SELECT c.IdCandidato, c.Descripcion, c.NumTotalVotos, ca.Titulo AS Campania, u.NombreCompleto AS Ingeniero, ca.idcampania
            FROM Candidato c
            JOIN Campania ca ON c.CampaniaId = ca.IdCampania
            JOIN Ingeniero i ON c.IngenieroId = i.IdIngeniero
            JOIN UsuarioSistema u ON i.UsuarioSistemaId = u.IdUsuarioSistema
            WHERE ca.idcampania = $1`,
            [idCampania]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ msg: 'No hay candidatos postulados para esta campaña' });
            return;
        }

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener candidatos por campania' });
    }
};

export const registrarCandidato = async (req: Request, res: Response) => {
    const { descripcion, campaniaId, ingenieroId }: IregistrarCandidato = req.body;

    try {
        const candidatoExistente = await pool.query(
            'SELECT 1 FROM Candidato WHERE CampaniaId = $1 AND IngenieroId = $2',
            [campaniaId, ingenieroId]
        );

        if (candidatoExistente.rowCount == null || candidatoExistente.rowCount > 0) {
            res.status(400).json({ msg: 'El ingeniero ya está registrado como candidato en esta campaña.' });
            return;
        }

        const result = await pool.query(
            'INSERT INTO Candidato (Descripcion, NumTotalVotos, CampaniaId, IngenieroId) VALUES ($1, 0, $2, $3) RETURNING *',
            [descripcion, campaniaId, ingenieroId]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al registrar candidato' });
    }
};

export const eliminarCandidato = async (req: Request, res: Response) => {
    const { idCandidato } = req.params;

    try {
        const candidato = await pool.query(
            'SELECT numtotalvotos FROM Candidato WHERE IdCandidato = $1',
            [idCandidato]
        );

        if (candidato.rowCount === 0) {
            res.status(404).json(
                { msg: 'Candidato no encontrado' }
            );
            return;
        }

        if (candidato.rows[0].numtotalvotos > 0) {
            res.status(500).json(
                { msg: 'No puedes eliminar este candidato porque ya tiene votos.' }
            );
            return;
        }

        // Eliminar el candidato de la base de datos
        await pool.query(
            'DELETE FROM Candidato WHERE IdCandidato = $1',
            [idCandidato]
        );

        res.status(200).json({
            msg: 'Candidato eliminado exitosamente',
            idCandidato
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el candidato',
        });
    }
};
