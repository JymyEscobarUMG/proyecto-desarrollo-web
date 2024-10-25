import Swal from 'sweetalert2';
import backendVotosApi from '../../../api/backendVotosApi';
import style from "../../../assets/css/pagesCampania.module.scss"

interface CampaniaAgregarModalProps {
    onFetchCampanias: () => void;
}


export const CampaniaAgregarModal = ({ onFetchCampanias }: CampaniaAgregarModalProps) => {

    const handleAgregarCampania = async (codigoCampania: number) => {
        console.log(codigoCampania);

        // Mostrar el modal con los inputs para título y descripción
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Nueva Campaña',
            html: `
            <div class="mb-3">
                <label style="text-align: left; display: block;">Título:</label>
                <input id="swal-input1" class="form-control" placeholder="Título de la campaña">
            </div>
                <label style="text-align: left; display: block;">Descripción:</label>
                <textarea id="swal-input2" class="form-control" placeholder="Descripción de la campaña"></textarea>
            `,
            focusConfirm: false,
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText: `Agregar Campaña`,
            confirmButtonColor: "#003865",
            didOpen: () => {
                const extraButton = document.getElementById('extra-button');
                extraButton?.addEventListener('click', () => {
                    const tituloInput = document.getElementById('swal-input1') as HTMLInputElement;
                    const descripcionTextarea = document.getElementById('swal-input2') as HTMLTextAreaElement;

                    // Setear valores predefinidos en los inputs
                    tituloInput.value = 'Campaña por Defecto';
                    descripcionTextarea.value = 'Descripción por Defecto de la campaña';
                });
            }
            ,
            preConfirm: () => {
                const titulo = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const descripcion = (document.getElementById('swal-input2') as HTMLTextAreaElement).value;

                if (!titulo || !descripcion) {
                    Swal.showValidationMessage('Por favor completa ambos campos');
                    return;
                }

                if (descripcion.length > 500) {
                    Swal.showValidationMessage('La descripción tiene que ser menor a 500 caracteres');
                    return;
                }

                if (titulo.length > 150) {
                    Swal.showValidationMessage('El título tiene que ser menor a 150 caracteres');
                    return;
                }

                return { titulo, descripcion };
            },
        });

        if (formValues) {
            try {
                // Enviar los datos al backend usando Axios
                const response = await backendVotosApi.post('/api/campanias/registrar', formValues);

                Swal.fire({
                    title: 'Campaña registrada',
                    text: 'La campaña ha sido registrada exitosamente.',
                    icon: 'success',
                });

                onFetchCampanias();

                console.log('Respuesta del servidor:', response.data);
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al registrar la campaña. Inténtalo de nuevo.',
                    icon: 'error',
                });

                console.error('Error al registrar campaña:', err);
            }
        }
    };

    return (
        <div className={`${style['campaign-card']} ${style['new-campaign']}`} onClick={() => { handleAgregarCampania(1) }}>
            <div className="add-icon">+</div>
            <p>Crear Nueva Campaña</p>
        </div>
    );
};
