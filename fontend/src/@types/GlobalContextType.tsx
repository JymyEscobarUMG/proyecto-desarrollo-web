import { Dispatch, SetStateAction } from "react";

export interface GlobalType {
    autorizado: boolean | undefined;
    rolid: number;

}

export interface GlobalContextType {
    global: GlobalType;
    setGlobal: Dispatch<SetStateAction<GlobalType>>;
}
