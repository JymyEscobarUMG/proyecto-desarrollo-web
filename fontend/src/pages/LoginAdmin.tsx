import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/globalContext";
import { GlobalContextType } from "../@types/GlobalContextType";

export const LoginAdmin = () => {
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
            const respuesta = await axios.post(import.meta.env.VITE_URL_API + '/api/usuarios/loginAdmin', formData);
            console.log(respuesta);
            context?.setGlobal(respuesta.data.user);

            navigate('/Admin/login/home');
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.msg || "Error en el inicio de sesión");
        }
    };

    return (
        <div className="container">
            <h2>Login Administrativo</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>

                <button type="button" className="btn btn-secondary mt-2" onClick={() => { navigate('/Admin/register') }}>Registrar</button>
            </form>
        </div>
    );
}
