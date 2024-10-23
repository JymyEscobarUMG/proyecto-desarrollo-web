import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { PagesCampania, PagesCandidato, PagesLogin, PagesLoginAdmin, PagesRegister, PagesRegisterAdmin } from '../pages'
import { useContext, useEffect } from 'react';
import backendVotosApi from '../api/backendVotosApi';
import { GlobalContextType } from '../@types/GlobalContextType';
import { GlobalContext } from '../contexts/globalContext';

export const AppRoutes = () => {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);
    const navigate = useNavigate();

    const fetchValidarToken = async () => {
        try {
            const token = localStorage.getItem('ProyectoFinal-Token');
            if (!token) {
                context?.setGlobal((prevGlobal) => ({
                    ...prevGlobal,
                    autorizado: false,
                }));

                localStorage.clear();
                return;
            }

            const response = await backendVotosApi.get(`/api/usuarios/validarToken`);


            if (response.data != null) {
                context?.setGlobal((prevGlobal) => ({
                    ...prevGlobal,
                    autorizado: true,
                    rolid: response.data.rolid
                }));
            } else {
                context?.setGlobal((prevGlobal) => ({
                    ...prevGlobal,
                    autorizado: false,
                }));

                localStorage.clear();
                navigate('/login');
            }
        } catch (error) {
            context?.setGlobal((prevGlobal) => ({
                ...prevGlobal,
                autorizado: false,
            }));
            
            localStorage.clear();
            navigate('/login');
        }
    }

    useEffect(() => {
        fetchValidarToken();
    }, [])

    if (context?.global.autorizado === undefined) {
        return (
            <h3>Cargando...</h3>
        )
    }
    console.log(context?.global.autorizado)

    return (
        <Routes>
            {
                (context?.global.autorizado === false)
                    ? //No autenticado
                    (
                        <>
                            {/* Ingeniero */}
                            <Route path="/" element={<PagesLogin />} />
                            <Route path="/login" element={<PagesLogin />} />
                            <Route path="/register" element={<PagesRegister />} />
                            {/* Administrador */}
                            <Route path="/Admin/" element={<PagesLoginAdmin />} />
                            <Route path="/Admin/login" element={<PagesLoginAdmin />} />
                            <Route path="/Admin/register" element={<PagesRegisterAdmin />} />
                            <Route path='/*' element={<Navigate to="/login" />} />
                        </>
                    )
                    : //Autenticado
                    (
                        <>
                            {/* Ingeniero */}
                            <Route path="/" element={<PagesLogin />} />
                            <Route path="/login" element={<PagesLogin />} />
                            <Route path="/register" element={<PagesRegister />} />

                            {/* Administrador */}
                            <Route path="/Admin/" element={<PagesLoginAdmin />} />
                            <Route path="/Admin/login" element={<PagesLoginAdmin />} />
                            <Route path="/Admin/register" element={<PagesRegisterAdmin />} />

                            {/* Todos */}
                            <Route path="/Campanias" element={<PagesCampania />} />
                            <Route path="/Campanias/:idCampania" element={<PagesCandidato />} />
                            <Route path='/*' element={<Navigate to="/Campanias" />} />
                        </>
                    )
            }
        </Routes>
    )
}
