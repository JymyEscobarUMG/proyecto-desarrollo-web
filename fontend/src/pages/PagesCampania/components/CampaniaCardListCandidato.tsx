import Swal from "sweetalert2";
import style from "../../../assets/css/campaniaCard.module.scss"
import backendVotosApi from "../../../api/backendVotosApi";
import { useContext } from "react";
import { GlobalContextType } from "../../../@types/GlobalContextType";
import { GlobalContext } from "../../../contexts/globalContext";

interface CampaniaCardListCandidatoProps {
    idCandidato: number;
    nombre: string;
    onCandidatoEliminado: (id: number) => void;
}

export const CampaniaCardListCandidato = ({ idCandidato, nombre, onCandidatoEliminado }: CampaniaCardListCandidatoProps) => {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);

    const onClickEliminarCandidato = async () => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar al candidato: ${nombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar',
        });

        if (confirmacion.isConfirmed) {
            try {
                await backendVotosApi.delete(`/api/candidatos/eliminar/${idCandidato}`);

                Swal.fire(
                    'Eliminado!',
                    `El candidato ${nombre} ha sido eliminado.`,
                    'success'
                );

                onCandidatoEliminado(idCandidato);
            } catch (error: any) {
                console.error('Error al eliminar el candidato:', error);

                Swal.fire({
                    title: 'Error',
                    text: error.response.data.msg,
                    icon: 'error',
                });
            }
        }
    };

    return (
        <li>
            {nombre}
            {context?.global.rolid == 1 &&
                <>
                    <span className={style['remove-candidate-btn']} onClick={onClickEliminarCandidato}>
                        <img src="https://img.icons8.com/material-outlined/24/000000/trash.png" alt="Eliminar" />
                    </span>
                </>
            }
        </li>
    )
}
