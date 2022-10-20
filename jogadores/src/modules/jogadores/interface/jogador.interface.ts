import { Document } from "mongoose";
export interface IJogador extends Document{
    readonly telefone:string;
    readonly email:string;
    nome:string;
    ranking:string;
    posicaoRanking:string;
    urlFotojogador:string;

}