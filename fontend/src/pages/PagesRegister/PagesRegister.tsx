import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllErrorMessages } from '../../core/helpers/getAllErrorMessages';
import { AlertaError } from '../../core/components/AlertaError';
import backendVotosApi from '../../api/backendVotosApi';
import style from '../../assets/css/login.module.scss'

export const PagesRegister = () => {
    const [formData, setFormData] = useState({
        numeroColegiado: '',
        dpi: '',
        fechaNacimiento: '',
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
            const respuesta = await backendVotosApi.post('/api/usuarios/registrarIngeniero', formData);

            console.log(respuesta.data);
            navigate('/login');
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
        <>
            <img
                width={'100%'}
                height={'450px'}
                src="https://i.ibb.co/HD6LLk4/Captura-de-Pantalla-2024-10-26-a-la-s-08-07-29.png"
            />
            <div className={style.container}>
                <h2>Registro Ingeniero</h2>

                <AlertaError error={error} />

                <form onSubmit={handleSubmit}>
                    <div className={style['form-group']}>
                        <label>Numero Colegiado</label>
                        <input type="text" name="numeroColegiado" className="form-control" value={formData.numeroColegiado} onChange={handleChange} required />
                    </div>
                    <div className={style['form-group']}>
                        <label>DPI</label>
                        <input type="text" name="dpi" className="form-control" value={formData.dpi} onChange={handleChange} required />
                    </div>
                    <div className={style['form-group']}>
                        <label>Fecha Nacimiento</label>
                        <input type="date" name="fechaNacimiento" className="form-control" value={formData.fechaNacimiento} onChange={handleChange} required />
                    </div>
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

                    <button type="button" className="btn btn-secondary mt-2" onClick={() => { navigate('/login') }}>Login</button>

                </form>
            </div>
        </>
    );
}
