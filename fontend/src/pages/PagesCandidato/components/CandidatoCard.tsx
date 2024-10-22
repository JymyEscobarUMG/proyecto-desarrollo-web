import Swal from "sweetalert2";
import backendVotosApi from "../../../api/backendVotosApi";
import style from "../../../assets/css/pagesCandidato.module.scss";

interface CandidatoCardProps {
    candidatoId: number;
    campaniaId: number;
    nombre: string;
    descripcion: string;
    onVotoAgregar: () => void;
}

export const CandidatoCard = ({ candidatoId, campaniaId, nombre, descripcion, onVotoAgregar }: CandidatoCardProps) => {
    const onClickVotar = async () => {
        try {
            await backendVotosApi.post('/api/votos/registrar', { candidatoId, campaniaId });
            onVotoAgregar();

            Swal.fire({
                text: 'Voto registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            });
        } catch (error: any) {
            console.error('Error al votar:', error);
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.msg || 'Ha ocurrido un error al votar.',
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 2000
            });
        }
    };

    return (
        <div className={style['campaign-card']} data-id="1">
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <button onClick={onClickVotar} >Votar</button>
        </div>
    )
}
