import { IJogador } from "src/modules/desafios/interface/jogador.interface"

export interface Partida extends Document{
    desafio:string
    categoria: string
    jogadores: Array<IJogador>
    def: IJogador
    resultado: Array<Resultado>  
}

export interface Resultado {
    set: string
}