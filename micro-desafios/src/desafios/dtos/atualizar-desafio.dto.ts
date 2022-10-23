
import { IsOptional } from 'class-validator';
import { DesafioStatus } from '../interface/desafio.status';

export class AtualizarDesafioDto {

  @IsOptional()
  //@IsDate()
  dataHoraDesafio: Date;

  @IsOptional()
  status: DesafioStatus;

}
