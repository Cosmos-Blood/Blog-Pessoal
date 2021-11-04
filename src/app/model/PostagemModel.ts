import { TemaModel } from "./TemaModel";
import { UsuarioModel } from "./UsuarioModel";

export class PostagemModel{
    public idPostagem: number;
    public temaRelacionado: TemaModel;
    public textoPostagem: string;
    public tituloPostagem: string;
    public usuarioCriador: UsuarioModel;
    
}