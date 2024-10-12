import { Request, Response } from "express";
import pool from "../db/conexion";

export const registrarVoto = async (req: Request, res: Response) => {
    const { ingenieroId, candidatoId } = req.body;

    try {
        // Llamar al procedimiento almacenado para registrar el voto y actualizar los votos del candidato
        const respuesta = await pool.query(
            'SELECT registrar_voto($1, $2)',
            [ingenieroId, candidatoId]
        );

        res.status(201).json({
            msg: respuesta.rows[0].registrar_voto
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Ha ocurrido un error en el servicio'
        });
    }
};

export const verConteoVotosPorCampania = async (req: Request, res: Response) => {
    const { idCampania } = req.params;

    try {
        const totalVotosResult = await pool.query('SELECT SUM(NumTotalVotos) AS total_votos FROM Candidato');
        const totalVotos = totalVotosResult.rows[0].total_votos || 0;

        if (totalVotos === 0) {
            res.status(200).json({ msg: 'Aún no se han registrado votos' });
            return;
        }

        const result = await pool.query(
            `SELECT 
                c.IdCandidato, 
                u.NombreCompleto AS NombreCandidato,
                c.NumTotalVotos, 
                ((c.NumTotalVotos * 100.0) / $1) AS PorcentajeVotos
            FROM Candidato c
            INNER JOIN Ingeniero i ON c.IngenieroId = i.IdIngeniero
            INNER JOIN UsuarioSistema u ON i.UsuarioSistemaId = u.IdUsuarioSistema
            WHERE c.CampaniaId = $2
            ORDER BY c.NumTotalVotos DESC
            `,
            [totalVotos, idCampania]
        );

        // Verificar si se encontraron candidatos
        if (result.rows.length === 0) {
            res.status(404).json({ msg: 'No se encontraron votos para esta campaña' });
            return;
        }

        // Retornar los resultados
        res.json(result.rows);

    } catch (error) {
        console.error('Error al obtener el conteo de votos:', error);
        res.status(500).json({ msg: 'Error al obtener el conteo de votos' });
    }
};