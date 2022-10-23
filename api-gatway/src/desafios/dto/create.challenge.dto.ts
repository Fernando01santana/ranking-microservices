import { IsNotEmpty, IsDate, IsArray, ArrayMinSize, ArrayMaxSize, IsDateString } from 'class-validator';

export class IGaming {
    _id:string
}
export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsNotEmpty()
  solicitante: IGaming;

  @IsNotEmpty()
  categoria: string; 

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: IGaming[]
}

