import * as mongoose from 'mongoose';

export const PartidaSchema = new mongoose.Schema({
    categoria: {type: String},
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jogador"
    }],
    def: { type: mongoose.Schema.Types.ObjectId, ref: "jogador" },
    resultado: [
        { set: {type: String} }
    ]        

}, {timestamps: true, collection: 'partidas' })