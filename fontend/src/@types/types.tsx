export interface Campania {
    idcampania: number;
    titulo: string;
    descripcion: string;
    fechacreacion: string;
    fechafinalizacion: string | null;
    estadoid: number;
}

export interface Candidato {
    idcandidato: number;
    descripcion: string;
    ingeniero: string;
    idcampania: number;
}

export interface FormularioCampania {
    titulo: string;
    descripcion: string;
}

export interface VotosCandidato {
    idcandidato : number,
    nombrecandidato : string,
    descripcion: string,
    numtotalvotos : number,
    porcentajevotos : number
}