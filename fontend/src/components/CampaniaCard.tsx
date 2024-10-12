import { Link } from "react-router-dom";
import { Campania } from "../@types/types";

interface CampaniaCardProps {
    campania: Campania;
}
export const CampaniaCard = ({ campania }: CampaniaCardProps) => {
    return (
        <div className="card mb-4" style={{ width: '18rem' }}>
            <Link to={`/Campanias/${campania.idcampania}`}>
                <div className="card-body">
                    <h5 className="card-title">{campania.titulo}</h5>
                    <p className="card-text">{campania.descripcion}</p>
                    {/* <p className="card-text">
                    <strong>Fecha de Creación:</strong> {new Date(campania.fechacreacion).toLocaleDateString()}
                </p> */}
                    <p className="card-text">
                        <strong>Estado:</strong> {campania.estadoid === 1 ? 'Activo' : 'Finalizado'}
                    </p>
                    {campania.fechafinalizacion && (
                        <p className="card-text">
                            <strong>Fecha de Finalización:</strong> {new Date(campania.fechafinalizacion).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
}
