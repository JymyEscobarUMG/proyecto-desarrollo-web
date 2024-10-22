import { useEffect, useState } from "react";
import { Campania, Candidato } from "../../../@types/types";
import style from "../../../assets/css/campaniaCard.module.scss"
import backendVotosApi from "../../../api/backendVotosApi";
import { CampaniaCardListCandidato } from "./CampaniaCardListCandidato";
import Swal from "sweetalert2";
import { CandidatoAgregarModal } from "../../PagesCandidato/components/CandidatoAgregarModal";
import { Link } from "react-router-dom";

interface CampaniaCardProps {
    campania: Campania;
}

export const CampaniaCard = ({ campania }: CampaniaCardProps) => {
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [estadoCampania, setEstadoCampania] = useState<number>(campania.estadoid);

    const fetchCandidatos = async () => {
        try {
            const response = await backendVotosApi.get(`/api/candidatos/${campania.idcampania}`);

            setCandidatos(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchCandidatos();
    }, []);

    const eliminarCandidato = (id: number) => {
        setCandidatos(candidatos.filter(c => c.idcandidato !== id));
    };

    const toggleEstadoCampania = async () => {
        try {
            const response = await backendVotosApi.put(`/api/campanias/toggleEstado/${campania.idcampania}`);
            setEstadoCampania(response.data.estadoid);

            // Swal.fire({
            //     title: "Estado actualizado",
            //     text: `La campaña ahora está ${response.data.estadoid === 1 ? "activada" : "finalizada"}.`,
            //     icon: "success",
            // });
        } catch (error) {
            console.error("Error al cambiar el estado de la campaña:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al cambiar el estado de la campaña.",
                icon: "error",
            });
        }
    };

    return (
        <>
            <div className={style['campaign-card']} data-id="1">
                <h2>{campania.titulo}</h2>
                <span className={estadoCampania === 1 ? style.campaniaActiva : style.campaniaFinalizada}>
                    {estadoCampania === 1 ? 'Activa' : 'Finalizada'}
                </span>
                <p>{campania.descripcion}</p>

                <div className={style.details}>
                    <label>Habilitar Votación:</label>
                    <input
                        type="checkbox"
                        id="habilitada1"
                        checked={estadoCampania === 1}
                        onChange={toggleEstadoCampania}
                    />
                    <div className={style.candidates}>
                        <h3>Candidatos</h3>
                        <ul id="candidate-list-1">
                            {candidatos.map((candidato) => (
                                <CampaniaCardListCandidato
                                    key={candidato.idcandidato}
                                    idCandidato={candidato.idcandidato}
                                    nombre={candidato.ingeniero}
                                    onCandidatoEliminado={eliminarCandidato}
                                />
                            ))}
                        </ul>

                        <CandidatoAgregarModal campaniaId={campania.idcampania} onCandidatoAgregado={fetchCandidatos} />

                    </div>
                </div>

                <Link className="btn btn-secondary btn-sm mt-2 w-100" to={`/Campanias/${campania.idcampania}`}>Ver Detalle</Link>

            </div>
        </>
    );
}
