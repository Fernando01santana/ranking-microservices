import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema({
    dataHoraDesafio: { 
        type: Date 
    },
    status: { 
        type: String 
    },
    dataHoraSolicitacao: { 
        type: Date 
    },
    dataHoraResposta: { 
        type: Date 
    },
    solicitante: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "jogador"
    },
    categoria: {
        type: String 
    },
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jogador"
    }],
    partida: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "partidas" 
    },    
}, {
    timestamps: true, collection: 'desafios' })



