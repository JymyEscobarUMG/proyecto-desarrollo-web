export interface IquerybuscarColegiado {
    IdIngeniero: number;
    NombreCompleto: string;
    Dpi: string;
    FechaNacimiento: string;
}

export interface IregistrarCandidato {
    descripcion: string;
    campaniaId: number;
    ingenieroId: number;
}