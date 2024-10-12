import { useEffect, useState } from "react";
import { Campania } from "../@types/types";
import axios from "axios";
import { CampaniaCard } from "../components/CampaniaCard";

export const Campanias = () => {
    const [campanias, setCampanias] = useState<Campania[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampanias = async () => {
            try {
                const respuesta = await axios.get(import.meta.env.VITE_URL_API + '/api/campanias');
                console.log(respuesta)
                setCampanias(respuesta.data);
            } catch (err) {
                setError('Error al cargar las campañas');
            } finally {
                setLoading(false);
            }
        };

        fetchCampanias();
    }, [campanias]);

    if (loading) { 
        return <p>Cargando campañas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <div className="row">
                {campanias.map((campania) => (
                    <div className="col xs-12 md-6 lg-4" key={campania.idcampania}>
                        <CampaniaCard campania={campania} />
                    </div>
                ))}
            </div>
        </div>
    );
}
