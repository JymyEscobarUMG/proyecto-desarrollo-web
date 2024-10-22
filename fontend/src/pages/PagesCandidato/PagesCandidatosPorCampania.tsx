import { useContext, useEffect, useState } from "react";
import { Candidato } from "../../@types/types";
import { useParams } from "react-router-dom";
import backendVotosApi from "../../api/backendVotosApi";
import { GlobalContext } from "../../contexts/globalContext";
import { GlobalContextType } from "../../@types/GlobalContextType";
import { CandidatoCard2 } from "./components/CandidatoCard2";

export const PagesCandidatosPorCampania = () => {
    const { idCampania } = useParams();
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const context = useContext<GlobalContextType | undefined>(GlobalContext);

    useEffect(() => {
        const fetchCandidatos = async () => {
            try {
                const response = await backendVotosApi.get(`/api/candidatos/${idCampania}`);
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

    useEffect(() => {
        console.log(context?.global)
    }, [context?.global])


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
                    <CandidatoCard2
                        key={candidato.idcandidato}
                        candidatoId={candidato.idcandidato}
                        campaniaId={candidato.idcampania}
                        nombre={candidato.ingeniero}
                        descripcion={candidato.descripcion}
                    />
                ))}
            </div>
        </div>
    );
}
