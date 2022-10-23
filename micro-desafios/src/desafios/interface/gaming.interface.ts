export interface IGaming extends Document {
    readonly telefoneCelular: string;
    readonly email: string;
    categoria: ICategoria;
    nome: string;  
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador?: string;
}


export interface ICategoria extends Document{
    readonly categoria:string;
    descricao: string;
    eventos:Array<Evento>;
    jogadores:Array<IGaming>
}

export interface Evento{
    nome:string;
    operacao:string;
    valor:number;
}