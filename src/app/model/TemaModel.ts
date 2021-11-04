import { PostagemModel } from "./PostagemModel";

export class TemaModel{
    public idTema: number;
    public postagens: PostagemModel[];
    public tema: string;
}