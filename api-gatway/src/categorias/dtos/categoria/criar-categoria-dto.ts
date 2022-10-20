import { ArrayMaxSize, IsArray, IsNotEmpty, isString, IsString } from "class-validator";

export class CriarCategoriaDto{
    @IsNotEmpty()
    @IsString()
    readonly categoria: string;

    @IsNotEmpty()
    @IsString()
    descricao:string;

    @IsArray()
    @ArrayMaxSize(1)
    eventos:Array<Evento>
}

export interface Evento{
    nome:string;
    operacao:string;
    valor:number;
}