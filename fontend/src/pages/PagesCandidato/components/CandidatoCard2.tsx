import { useContext } from "react";
import Swal from "sweetalert2";
import { GlobalContext } from "../../../contexts/globalContext";
import { GlobalContextType } from "../../../@types/GlobalContextType";
import backendVotosApi from "../../../api/backendVotosApi";

interface CandidatoCardProps {
    candidatoId: number;
    campaniaId: number;
    nombre: string;
    descripcion: string;
}

export const CandidatoCard2 = ({ candidatoId, campaniaId, nombre, descripcion }: CandidatoCardProps) => {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);

    const onClickVotar = async () => {
        try {
            await backendVotosApi.post('/api/votos/registrar', { candidatoId, campaniaId });

            context?.setGlobal(true);
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

            context?.setGlobal(false);
        }
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body text-center">
                    <img src="https://placehold.jp/150x150.png" className="img-fluid rounded-circle mb-3" alt={nombre} />
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">{descripcion}</p>
                    <button className="btn btn-danger" onClick={onClickVotar} >Votar</button>
                </div>
            </div>
        </div>
    );
}
