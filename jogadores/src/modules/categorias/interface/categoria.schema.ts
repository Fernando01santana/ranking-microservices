import mongoose from "mongoose";

export const categoriaSchema = new mongoose.Schema({
    categoria:{type:String,unique:true},
    descricao:{type:String},
    eventos:[{
        nome:{type:String},
        operacao:{type:String},
        valor:{type:Number}
    }],
    jogadores:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jogadores"
    }]
},{timestamps:true,collection:'categoria'})