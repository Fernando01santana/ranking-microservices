import { ArrayMaxSize, IsArray, IsNotEmpty, isString, IsString } from "class-validator";
import { Evento } from "../interface/categoria.interface";

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