import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/globalContext";
import { GlobalContextType } from "../../@types/GlobalContextType";
import backendVotosApi from "../../api/backendVotosApi";
import style from '../../assets/css/login.module.scss'

export const PagesLoginAdmin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string>('');
    const context = useContext<GlobalContextType | undefined>(GlobalContext);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const respuesta = await backendVotosApi.post('/api/usuarios/loginAdmin', formData);
            console.log(respuesta);
            localStorage.setItem('ProyectoFinal-Token', respuesta.data.token);

            context?.setGlobal((prevGlobal) => ({
                ...prevGlobal,
                rolid: respuesta.data.usuario.rolid,
                autorizado: true,
            }));

            navigate('/Admin/login/home');
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.msg || "Error en el inicio de sesión");
        }
    };

    return (
        <div className={style.container}>
            <h2>Login Administrativo</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className={style['form-group']}>
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className={style['form-group']}>
                    <label>Contraseña</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className={`btn btn-primary ${style['button-blue']} `}>Iniciar sesión</button>

                <button type="button" className="btn btn-secondary mt-2" onClick={() => { navigate('/Admin/register') }}>Registrar</button>
            </form>
        </div>
    );
}
