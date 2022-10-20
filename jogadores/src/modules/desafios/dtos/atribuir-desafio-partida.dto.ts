import { IsNotEmpty } from 'class-validator';
import { IJogador } from 'src/modules/jogadores/interface/jogador.interface';
import { Resultado } from '../interfaces/desafio.interface';



export class AtribuirDesafioPartidaDto {

  @IsNotEmpty()
  def: IJogador

  @IsNotEmpty()
  resultado: Array<Resultado>
  
}
