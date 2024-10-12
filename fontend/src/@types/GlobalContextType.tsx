import { Dispatch, SetStateAction } from "react";

export interface GlobalContextType {
    global: any;
    setGlobal: Dispatch<SetStateAction<any>>;
}

export interface Candidato {
    idcandidato: number;
    descripcion: string;
    ingeniero: string;
}