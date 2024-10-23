import { CampaniaCardListCandidato } from './CampaniaCardListCandidato'
import { CandidatoAgregarModal } from '../../PagesCandidato/components/CandidatoAgregarModal'
import style from "../../../assets/css/campaniaCard.module.scss"
import { Campania, Candidato } from '../../../@types/types';
import { useContext } from 'react';
import { GlobalContextType } from '../../../@types/GlobalContextType';
import { GlobalContext } from '../../../contexts/globalContext';

interface CampaniaCardDetailsProps {
    campania: Campania;
    candidatos: Candidato[];
    estadoCampania: number;
    fetchCandidatos: () => void;
    eliminarCandidato: (id: number) => void;
    toggleEstadoCampania: () => void;
}

export const CampaniaCardDetails = ({ campania, candidatos, estadoCampania, fetchCandidatos, eliminarCandidato, toggleEstadoCampania }: CampaniaCardDetailsProps) => {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);

    return (
        <div className={style.details}>
            {context?.global.rolid == 1 &&
                <>
                    <label>Habilitar Votación:</label>
                    <input
                        type="checkbox"
                        id="habilitada1"
                        checked={estadoCampania === 1}
                        onChange={toggleEstadoCampania}
                    />
                </>
            }
            
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

                {context?.global.rolid == 1 &&
                    <CandidatoAgregarModal campaniaId={campania.idcampania} onCandidatoAgregado={fetchCandidatos} />
                }
            </div>
        </div>
    )
}
