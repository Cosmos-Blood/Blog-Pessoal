import { PostagemModel } from "./PostagemModel";

export class UsuarioModel{
    public email: string;
    public foto: string;
    public idUsuario: number;
    public minhasPostagens: PostagemModel[];
    public nome: string;
    public senha: string;
    public tipo: string;
}