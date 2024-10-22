import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendVotosApi from "../../api/backendVotosApi";
import { getAllErrorMessages } from "../../core/helpers/getAllErrorMessages";
import { AlertaError } from "../../core/components/AlertaError";
import style from '../../assets/css/login.module.scss'

export const PagesRegisterAdmin = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState<Array<string>>();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const respuesta = await backendVotosApi.post('/api/usuarios/registrarAdministrador', formData);

            console.log(respuesta.data);
            navigate('/Admin/login');
        } catch (error: any) {
            console.log(error)

            if (error.response.data.errors != null) {
                const mensajesErrores = getAllErrorMessages(error.response.data.errors);
                console.log(mensajesErrores);

                setError(mensajesErrores);
            } else {
                setError([error.response.data.msg]);
            }
        }
    };

    return (
        <div className={style.container}>
            <h2>Registro Administrativo</h2>

            <AlertaError error={error} />

            <form onSubmit={handleSubmit}>
                <div className={style['form-group']}>
                    <label>Nombre</label>
                    <input type="text" name="nombreCompleto" className="form-control" value={formData.nombreCompleto} onChange={handleChange} required />
                </div>
                <div className={style['form-group']}>
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className={style['form-group']}>
                    <label>Contraseña</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className={`btn btn-primary ${style['button-blue']} `}>Registrar</button>

                <button type="button" className="btn btn-secondary mt-2" onClick={() => { navigate('/Admin/Login') }}>Login</button>

            </form>
        </div>
    );
}
