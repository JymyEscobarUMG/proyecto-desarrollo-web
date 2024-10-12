import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/globalContext";
import { GlobalContextType } from "../@types/GlobalContextType";

export const Login = () => {
    const [formData, setFormData] = useState({
        numeroColegiado: '',
        dpi: '',
        fechaNacimiento: '',
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
            const respuesta = await axios.post(import.meta.env.VITE_URL_API + '/api/usuarios/loginIngeniero', formData);
            console.log(respuesta);
            context?.setGlobal(respuesta.data.user);

            navigate('/login/home');
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.msg || "Error en el inicio de sesión");
        }
    };

    return (
        <div className="container">
            <h2>Login Ingeniero</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Numero Colegiado</label>
                    <input type="text" name="numeroColegiado" className="form-control" value={formData.numeroColegiado} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>DPI</label>
                    <input type="text" name="dpi" className="form-control" value={formData.dpi} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Fecha Nacimiento</label>
                    <input type="email" name="fechaNacimiento" className="form-control" value={formData.fechaNacimiento} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>

                <button type="button" className="btn btn-secondary mt-2" onClick={() => { navigate('/register') }}>Registrar</button>
            </form>
        </div>
    );
}
