import { IsNotEmpty } from "class-validator"
import { Jogador } from "src/jogadores/interface/jogador-interface"

export class AtribuirDesafioPartidaDto {

    @IsNotEmpty()
    def: Jogador
  
    @IsNotEmpty()
    resultado: Array<Resultado>
    
  }
  export interface Resultado {
    set: string
}
