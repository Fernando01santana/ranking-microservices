import { IsNotEmpty } from 'class-validator';
import { Resultado } from '../interface/desafio.interface';
import { IGaming } from '../interface/gaming.interface';



export class AtribuirDesafioPartidaDto {

  @IsNotEmpty()
  def: IGaming

  @IsNotEmpty()
  resultado: Array<Resultado>
  
}
