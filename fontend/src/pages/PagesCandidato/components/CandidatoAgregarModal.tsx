
import Swal from 'sweetalert2';
import backendVotosApi from '../../../api/backendVotosApi';
import style from "../../../assets/css/campaniaCard.module.scss";

interface CampaniaCardProps {
    campaniaId: number;
    onCandidatoAgregado: () => void;
}

export const CandidatoAgregarModal = ({ campaniaId, onCandidatoAgregado }: CampaniaCardProps) => {

    const handleAgregarCandidato = async (campaniaId: number) => {
        let ingenieroId: number | null = null;

        const { value: formValues } = await Swal.fire({
            title: 'Agregar Nuevo Candidato',
            html: `
                <div class="mb-3">
                    <label style="text-align: left; display: block;">Número de Colegiado:</label>
                    <div style="display: flex;">
                        <input id="swal-input-colegiado" class="form-control" placeholder="Número de colegiado" />
                        <button id="buscar-colegiado" class="btn btn-primary" style="margin-left: 10px;">
                            <img src="https://img.icons8.com/material-outlined/24/ffffff/search.png" alt="Buscar">
                        </button>
                    </div>
                </div>
                <div id="colegiado-info" style="display: none; margin-top: 20px;">
                    <p><strong>Nombre Completo:</strong> <span id="colegiado-nombre"></span></p>
                    <p><strong>DPI:</strong> <span id="colegiado-dpi"></span></p>

                    <div class="mb-3">
                        <label style="text-align: left; display: block;">Descripción:</label>
                        <textarea id="swal-input-descripcion" class="form-control" placeholder="Descripción del candidato"></textarea>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText: `Agregar Candidato`,
            confirmButtonColor: "#003865",
            didOpen: () => {
                const buscarBtn = document.getElementById('buscar-colegiado');
                const colegiadoInput = document.getElementById('swal-input-colegiado') as HTMLInputElement;

                buscarBtn?.addEventListener('click', async () => {
                    if (!colegiadoInput.value) {
                        Swal.showValidationMessage('Debes ingresar un número de colegiado');
                        return;
                    }

                    try {
                        // Llamada al backend para buscar colegiado
                        const response = await backendVotosApi.get(`/api/candidatos/buscarColegiado/${colegiadoInput.value}`);
                        const { idingeniero, nombrecompleto, dpi } = response.data;

                        ingenieroId = idingeniero;

                        // Mostrar la información del colegiado
                        const colegiadoInfoDiv = document.getElementById('colegiado-info');
                        const nombreSpan = document.getElementById('colegiado-nombre');
                        const dpiSpan = document.getElementById('colegiado-dpi');

                        nombreSpan!.textContent = nombrecompleto;
                        dpiSpan!.textContent = dpi;
                        colegiadoInfoDiv!.style.display = 'block';

                        Swal.resetValidationMessage();
                    } catch (error) {
                        console.error('Error al buscar colegiado:', error);
                        Swal.showValidationMessage('No se encontró al colegiado');
                    }
                });
            },
            preConfirm: () => {
                const nombre = (document.getElementById('colegiado-nombre') as HTMLSpanElement).textContent;
                const dpi = (document.getElementById('colegiado-dpi') as HTMLSpanElement).textContent;
                const descripcion = (document.getElementById('swal-input-descripcion') as HTMLTextAreaElement).value;

                if (!nombre || !dpi || !ingenieroId) {
                    Swal.showValidationMessage('Debes buscar y seleccionar un colegiado válido');
                    return false;
                }

                if (!descripcion) {
                    Swal.showValidationMessage('Debes ingresar una descripción para el candidato');
                    return false;
                }

                return { ingenieroId, nombre, dpi, descripcion };
            },
        });

        if (formValues) {
            try {
                // Enviar los datos al backend usando Axios
                await backendVotosApi.post('/api/candidatos/registrar', {
                    campaniaId,
                    ingenieroId: formValues.ingenieroId,
                    descripcion: formValues.descripcion
                });

                onCandidatoAgregado();

                Swal.fire({
                    title: 'Candidato agregado',
                    text: 'El candidato ha sido agregado exitosamente.',
                    icon: 'success',
                });
            } catch (err: any) {
                Swal.fire({
                    title: 'Error',
                    text: err.response.data.msg,
                    icon: 'error',
                });

                console.error('Error al agregar candidato:', err);
            }
        }
    };

    return (
        <button className={style['add-candidate-btn']} onClick={() => { handleAgregarCandidato(campaniaId) }}>
            Agregar Candidato
        </button>
    );
}
