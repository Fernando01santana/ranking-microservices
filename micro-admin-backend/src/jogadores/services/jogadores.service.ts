import { Injectable, Logger } from '@nestjs/common';
import { IJogador } from '../interface/jogador.interface';
import {v4 as uuidv4 } from 'uuid'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JogadoresService {
    constructor(
    @InjectModel('jogador') 
    private readonly jogadorModule: Model<IJogador>){}
    private readonly logger = new Logger(JogadoresService.name);


    public async criar(criarJogadorDto:IJogador):Promise<IJogador>{
        const jogadorExiste = await this.jogadorModule.findOne({email:criarJogadorDto.email})
        if(jogadorExiste){
            throw new RpcException("O email informado ja esta em uso");
        }
        try {
            const jogadorCriado = new this.jogadorModule(criarJogadorDto)
            const criarJogador = await jogadorCriado.save()
            return criarJogador
        } catch (error) {
            throw new RpcException(`Erro ao criar jogador ${error}`)
        }

    }

    public async update(id:string,criarJogadorDto:any): Promise<IJogador>{  
        try {
            
            const allJogadores = await this.jogadorModule.find()
            const jogadorExists = allJogadores.filter(jogador => (jogador.id === id))
            if (jogadorExists.length === 0) {
                throw new RpcException("Jogador náo encontrado")
            }
            
            if (criarJogadorDto?.email) {
                const verifyEmail = allJogadores.filter(jogador => (jogador.email === criarJogadorDto.email))

                if (jogadorExists.length === 0 || verifyEmail.length === 1) {
                    throw new RpcException("Jogador náo encontrado ou email informado ja em uso")
                }
            }

            const jogadorAtualizado = await this.jogadorModule.findOneAndUpdate({email:jogadorExists[0].email},{$set:criarJogadorDto.data}).exec()                    
            return jogadorAtualizado
        } catch (error) {
            console.log(error);
            throw new RpcException("Erro ao atualizar jogador")
        }      

    }

    public async findAll(data:any):Promise<IJogador[]>{
        console.log('CHEGOU NO OUTRO MS');
        
        try {            
            
            if (data && data._id) {
                let jogador = await this.findById(data)
                return [jogador]
            }
            if (data.email) {
                let jogador = await this.findByEmail(data.email)
                return [jogador]
            }
            const jogadores = await this.jogadorModule.find();
            if (!jogadores) {
                throw new RpcException("Nenhum jogador cadastrado")
            }
            return jogadores;
        } catch (error) {            
            throw new RpcException(`Erro ao procurar jogadores ${error.message}`)
        }

    }

    public async findByEmail(email:string):Promise<IJogador>{
        try {
            const jogador = await this.jogadorModule.findOne({email:email})
            if (!jogador) {
                throw new RpcException("Nenhum jogador encontrado com o email informado")
            }
            return jogador;
        } catch (error) {
            console.log(error);
            throw new RpcException(`Erro ao procurar jogador ${error}`)
        }
    }

    public async findById(id:string):Promise<IJogador>{
        try {
            let gaming;
            const allGamings = await this.jogadorModule.find().populate([{ path: 'categoria', strictPopulate: false }]).exec()
            for (let index = 0; index < allGamings.length; index++) {
                const element = allGamings[index];
                gaming.push(element)
            }

            if (gaming.length == 0) {
                throw new RpcException("Nenhum jogador encontrado com o id informado")
            }
            return gaming;
        } catch (error) {
            console.log(error);
            throw new RpcException(`Erro ao procurar jogador ${error}`)
        }
    }

    public async delete(id:string):Promise<void>{
        try {            
                const jogador = await this.jogadorModule.findById(id)
                if (!jogador) {
                    throw new RpcException("Nenhum jogador encontrado")
                }
                await this.jogadorModule.deleteOne({_id:jogador.id})
                return
        } catch (error) {
           throw new RpcException("Erro ao remover usuario")
        }
    }

    
}
