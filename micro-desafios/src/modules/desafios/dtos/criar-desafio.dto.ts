import { IsNotEmpty, IsDate, IsArray, ArrayMinSize, ArrayMaxSize, IsDateString, IsString } from 'class-validator';

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsNotEmpty()
  @IsString()
  solicitante: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<Gaming>

  @IsString()
  categoria:string
}

interface Gaming{
  _id:string
}