import style from "../../assets/css/pagesCampania.module.scss"
import { useContext, useEffect, useState } from "react";
import { Campania } from "../../@types/types";
import { CampaniaCard } from "./components/CampaniaCard";
import backendVotosApi from "../../api/backendVotosApi";
import { EncabezadoSistema } from "../../core/components";
import { CampaniaAgregarModal } from "./components/CampaniaAgregarModal";
import { GlobalContextType } from "../../@types/GlobalContextType";
import { GlobalContext } from "../../contexts/globalContext";

export const PagesCampania = () => {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);
    const [campanias, setCampanias] = useState<Campania[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCampanias = async () => {
        try {
            const respuesta = await backendVotosApi.get('/api/campanias');
            console.log(respuesta)
            setCampanias(respuesta.data);
        } catch (err) {
            setError('Error al cargar las campañas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampanias();
    }, []);

    if (loading) {
        return <p>Cargando campañas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (

        <>
            
            <div className="container-fluid">
                <EncabezadoSistema titulo="Administración de Campañas" />

                <img
                width={'100%'}
                height={'450px'}
                src="https://i.ibb.co/vd0fbR7/Captura-de-Pantalla-2024-10-26-a-la-s-08-18-05.png"
            />

                <main>
                    <section className={style['campaign-grid']}>
                        {campanias.map((campania) => (
                            <div className="col xs-12 md-6 lg-4" key={campania.idcampania}>
                                <CampaniaCard campania={campania} />
                            </div>
                        ))}

                        {context?.global.rolid == 1 &&
                            <CampaniaAgregarModal onFetchCampanias={fetchCampanias} />
                        }
                    </section>
                </main>
            </div>
        </>
    );
}
