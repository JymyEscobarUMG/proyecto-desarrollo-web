import { useEffect, useState } from "react";
import { EncabezadoSistema } from "../../core/components"
import { Campania, Candidato, VotosCandidato } from "../../@types/types";
import backendVotosApi from "../../api/backendVotosApi";
import { Link, useParams } from "react-router-dom";
import { CandidatoCard } from "./components/CandidatoCard";
import style from "../../assets/css/pagesCandidato.module.scss"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const PagesCandidato = () => {
    const { idCampania } = useParams();
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [votosCandidato, setVotosCandidato] = useState<VotosCandidato[]>([]);
    const [campania, setCampania] = useState<Campania>();

    const fetchCandidatos = async () => {
        try {
            const response = await backendVotosApi.get(`/api/candidatos/${idCampania}`);

            setCandidatos(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    const fetchVotosCandidatos = async () => {
        try {
            const response = await backendVotosApi.get(`/api/votos/verVotos/${idCampania}`);
            setVotosCandidato(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const fetchCampanias = async () => {
        try {
            const respuesta = await backendVotosApi.get(`/api/campanias/${idCampania}`);
            console.log(respuesta)
            setCampania(respuesta.data);
        } catch (err) {
            console.error('Error fetching campania:', err);
        }
    };

    useEffect(() => {
        fetchCandidatos();
        fetchVotosCandidatos();
        fetchCampanias();
    }, [idCampania]);

    const data = {
        labels: votosCandidato.map((candidato) => candidato.nombrecandidato),
        datasets: [
            {
                label: 'Votos',
                data: votosCandidato.map((candidato) => candidato.numtotalvotos),
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            },

        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="container-fluid">
            <EncabezadoSistema titulo="Administración de Candidatos" />

            <img
                width={'100%'}
                height={'450px'}
                src="https://i.ibb.co/JvnN2sZ/Captura-de-Pantalla-2024-10-26-a-la-s-08-37-21.png"
            />

            <Link className="btn btn-secondary mt-2" to='/Campanias'>
                <img src="https://img.icons8.com/material-outlined/24/000000/left.png" alt="Regresar" className="me-2" />
                Regresar
            </Link>

            <main>
                <h2 className="mb-0">{campania?.titulo}</h2>
                <span className={`d-block text-center ${(campania?.estadoid) === 1 ? 'text-success' : 'text-danger'}`}>
                    {campania?.estadoid === 1 ? 'Activa' : 'Finalizada'}
                </span>
                <p>{campania?.descripcion}</p>
                <div className="d-flex justify-content-center mb-4">
                    <div className="col-12 col-md-8">
                        <Bar data={data} options={options} />
                    </div>
                </div>

                <section className={style['campaign-grid']}>
                    {candidatos.map((candidato) => (
                        <CandidatoCard
                            key={candidato.idcandidato}
                            candidatoId={candidato.idcandidato}
                            campaniaId={Number(candidato.idcampania)}
                            nombre={candidato.ingeniero}
                            descripcion={candidato.descripcion}
                            onVotoAgregar={fetchVotosCandidatos}
                        />
                    ))}
                </section>

                <h2 className="mt-4">Votos Totales</h2>
                <div className="d-flex justify-content-center">
                    <div className={'col-12 col-md-9'}>
                        {/* <h3 className="text-center">Resultados</h3> */}
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nombre del Candidato</th>
                                    <th scope="col">Total de Votos</th>
                                    <th scope="col">Porcentaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {votosCandidato.map((candidato) => (
                                    <tr key={candidato.idcandidato}>
                                        <td>{candidato.nombrecandidato}</td>
                                        <td>{candidato.numtotalvotos}</td>
                                        <td>{Math.round(candidato.porcentajevotos)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
