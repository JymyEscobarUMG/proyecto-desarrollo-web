import React, { useState } from 'react';
import { FormularioCampania } from '../../../@types/types';
import backendVotosApi from '../../../api/backendVotosApi';
import { getAllErrorMessages } from '../../../core/helpers/getAllErrorMessages';
import { AlertaError } from '../../../core/components/AlertaError';
import Swal from 'sweetalert2';

export const CampaniaAgregar = () => {
    const [formData, setFormData] = useState<FormularioCampania>({ titulo: '', descripcion: '' });
    const [error, setError] = useState<Array<string> | undefined>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(undefined);

        // Validar los campos
        if (!formData.titulo || !formData.descripcion) {
            setError(['Todos los campos son obligatorios']);
            return;
        }

        try {
            await backendVotosApi.post('/api/campanias/registrar', formData);

            Swal.fire({
                text: 'Campaña registrada exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            });

            // Limpiar los campos 
            setFormData({ titulo: '', descripcion: '' });
        } catch (error: any) {
            console.error(error);

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
        <div className="container mt-4">
            <h2>Agregar nueva Campaña</h2>
            <form onSubmit={handleSubmit}>
                <AlertaError error={error} />
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Título de la campaña"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción de la campaña"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Registrar Campaña</button>
            </form>
        </div>
    );
};
