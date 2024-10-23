import { Request } from 'express';
export interface IpostLoginInge {
    numeroColegiado: string;
    dpi: string;
    fechaNacimiento: string,
    password: string
}

export interface IqueryLoginInge {
    idusuariosistema: number;
    nombrecompleto: string;
    email: string;
    contrasenia: string;
    idingeniero: number;
    rolid: number;
}

export interface IpostLoginAdmin {
    email: string;
    password: string;
}

export interface IqueryLoginAdmin {
    idusuariosistema: number;
    nombrecompleto: string;
    email: string;
    contrasenia: string;
    rolid: number;
}

export interface IpostRegistrarInge {
    nombreCompleto: string;
    email: string;
    password: string;
    numeroColegiado: number;
    dpi: string;
    fechaNacimiento: string;
}

export interface IpostRegistrarAdmin {
    nombreCompleto: string;
    email: string;
    password: string;
}

export interface InuevoUsuarioAdmin {
    nombrecompleto: string;
    email: string;
    rolid: number;
}

export interface InuevoUsuarioInge {
    nombrecompleto: string;
    email: string;
    rolid: number;
}

export interface IusuarioToken {
    idusuariosistema: number,
    nombrecompleto: string,
    email: string,
    rolid: number,
    idingeniero?: number
}