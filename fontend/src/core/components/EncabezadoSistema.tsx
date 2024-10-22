
import { useNavigate } from 'react-router-dom';
import style from '../../assets/css/header.module.scss'
import { useContext } from 'react';
import { GlobalContextType } from '../../@types/GlobalContextType';
import { GlobalContext } from '../../contexts/globalContext';

interface EncabezadoSistemaProps {
    titulo: string
}

export const EncabezadoSistema = ({ titulo }: EncabezadoSistemaProps) => {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);
    const navigate = useNavigate();

    const onCerrarSesion = () => {
        localStorage.clear();
        context?.setGlobal({ rolid: 0, autorizado: false });        

        navigate('/login');
    }
    
    return (
        <header className='position-relative'>
            <div className="logo-container"></div>
            <h1>{titulo}</h1>
            <div className={style['user-icon']}></div>

            <button  className={`${style['btn-cerrar-sesion']} btn btn-danger position-absolute top-50 end-0 translate-middle-y me-2`} onClick={onCerrarSesion}>
                Cerrar Sesión
                <img
                    src="https://img.icons8.com/material-outlined/24/000000/exit.png"
                    alt="Cerrar sesión"
                    className="ms-1"
                />
            </button>
        </header>
    )
}
