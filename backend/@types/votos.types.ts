import { IusuarioToken } from "./usuarios.types";

export interface IregistrarVoto {
    usuario: IusuarioToken;
    candidatoId: number;
    campaniaId: number;
}