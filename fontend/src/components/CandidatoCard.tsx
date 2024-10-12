interface CandidatoCardProps {
    nombre: string;
    descripcion: string;
}
export const CandidatoCard = ({ nombre, descripcion }: CandidatoCardProps) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body text-center">
                    {/* Imagen del candidato, podrías agregar una URL estática o un placeholder */}
                    <img src="https://placehold.jp/150x150.png" className="img-fluid rounded-circle mb-3" alt={nombre} />
                    <h5 className="card-title">{nombre}</h5>
                    <p className="card-text">{descripcion}</p>
                    <button className="btn btn-danger">Votar</button>
                </div>
            </div>
        </div>
    );
}
