
import { Document } from 'mongoose';
import { IJogador } from './jogador.interface';

import { DesafioStatus } from './desafio.status'
import { Partida } from 'src/modules/partidas/interface/partida.interface';

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

export interface Resultado {
    set: string
}