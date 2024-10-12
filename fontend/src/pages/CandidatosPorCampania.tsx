import axios from "axios";
import { useEffect, useState } from "react";
import { CandidatoCard } from "../components/CandidatoCard";
import { Candidato } from "../@types/GlobalContextType";
import { useParams } from "react-router-dom";

export const CandidatosPorCampania = () => {
    const { idCampania, ...rest } = useParams();
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCandidatos = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_URL_API + `/api/candidatos/${idCampania}`);
                console.log(response)
                setCandidatos(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidatos();
    }, [idCampania]);

    if (loading) {
        return <p>Cargando candidatos...</p>;
    }

    if (candidatos.length === 0) {
        return <p>No hay candidatos disponibles para esta campaña.</p>;
    }

    return (
        <div className="container">
            <div className="row">
                {candidatos.map((candidato) => (
                    <CandidatoCard
                        key={candidato.idcandidato}
                        nombre={candidato.ingeniero}
                        descripcion={candidato.descripcion}
                    />
                ))}
            </div>
        </div>
    );
}
