import { IsNotEmpty,IsEmail,IsString, IsOptional } from "class-validator";

export class AtualizarJogadores{
    // @IsNotEmpty()
    // readonly telefoneCelular:string;
    // @IsEmail()
    // readonly email:string;

    @IsOptional()
    readonly categoria?:string;

    @IsOptional()
    urlFotoJogador?:string
}