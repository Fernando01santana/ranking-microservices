import { Document } from "mongoose";


export interface ICategoria extends Document{
    readonly categoria:string;
    descricao: string;
    eventos:Array<Evento>;
    jogadores:Array<IJogador>
}

export interface Evento{
    nome:string;
    operacao:string;
    valor:number;
}

export interface IJogador extends Document{
    readonly telefone:string;
    readonly email:string;
    nome:string;
    ranking:string;
    posicaoRanking:string;
    urlFotojogador:string;

}