
import { Document } from 'mongoose';
import { IJogador } from './jogador.interface';

import { DesafioStatus } from './desafio.status'

export interface Desafio extends Document {

    dataHoraDesafio: Date
    status: DesafioStatus
    dataHoraSolicitacao: Date
    dataHoraResposta: Date
    solicitante: IJogador
    categoria: string
    jogadores: Array<IJogador>
    partida: Partida  
}

export interface Partida extends Document{
    categoria: string
    jogadores: Array<IJogador>
    def: IJogador
    resultado: Array<Resultado>  
}

export interface Resultado {
    set: string
}