import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { IJogador } from '../interface/jogador.interface';
import {v4 as uuidv4 } from 'uuid'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import AppError from 'src/shared/error/AppError';

@Injectable()
export class JogadoresService {
    constructor(
    @InjectModel('jogador') 
    private readonly jogadorModule: Model<IJogador>){}
    private readonly logger = new Logger(JogadoresService.name);


    public async criarAtualizarJogador(criarJogadorDto:CriarJogadorDto):Promise<IJogador>{
        const jogadorExiste = await this.jogadorModule.findOne({email:criarJogadorDto.email})
        if(jogadorExiste){
            throw new AppError("O email informado ja esta em uso");
        }
        try {
            const criarJogador = await this.criar(criarJogadorDto)
            return criarJogador
        } catch (error) {
            throw new AppError(`Erro ao criar jogador ${error}`,400)
        }

    }

    public async criar(criarJogadorDto:CriarJogadorDto): Promise<IJogador>{
        const jogadorCriado = new this.jogadorModule(criarJogadorDto)
        try {
            const jogadorSalvado = await jogadorCriado.save()
            return jogadorSalvado;
        } catch (error) {
            console.log(error);
            
            throw new AppError(`Erro ao salvar jogador ${error}`,400)
        }
    }

    public async update(id:string,criarJogadorDto:CriarJogadorDto): Promise<IJogador>{  
        try {
            const {email,nome,telefoneCelular} = criarJogadorDto
            const allJogadores = await this.jogadorModule.find()
            const verifyEmail =   allJogadores.filter(jogador => (jogador.email === criarJogadorDto.email))
            const jogadorExists = allJogadores.filter(jogador => (jogador.id === id))

            if (jogadorExists.length === 0 || verifyEmail.length === 1) {
                throw new AppError("Jogador náo encontrado ou email informado ja em uso",404)
            }
    
            const jogadorAtualizado = await this.jogadorModule.findOneAndUpdate({email:jogadorExists[0].email},{$set:criarJogadorDto}).exec()        
            return jogadorAtualizado
        } catch (error) {
            console.log(error);
            
            throw new AppError("Erro ao atualizar jogador",400)
        }      

    }

    public async findAll():Promise<IJogador[]>{
        try {
            const jogadores = await this.jogadorModule.find();
            if (!jogadores) {
                throw new AppError("Nenhum jogador cadastrado")
            }
            return jogadores;
        } catch (error) {            
            throw new AppError(`Erro ao procurar jogadores ${error.message}`,400)
        }

    }

    public async findByEmail(email:string):Promise<IJogador>{
        try {
            const jogador = await this.jogadorModule.findOne({email:email})
            if (!jogador) {
                throw new AppError("Nenhum jogador encontrado com o email informado")
            }
            return jogador;
        } catch (error) {
            console.log(error);
            throw new AppError(`Erro ao procurar jogador ${error}`,400)
        }
    }

    public async findById(id:string):Promise<IJogador>{
        try {
            const jogador = await this.jogadorModule.findById({_id:id})
            if (!jogador) {
                throw new AppError("Nenhum jogador encontrado com o id informado")
            }
            return jogador;
        } catch (error) {
            console.log(error);
            throw new AppError(`Erro ao procurar jogador ${error}`,400)
        }
    }

    public async delete(id:string):Promise<void>{
        try {            
                const jogador = await this.jogadorModule.findById(id)
                if (!jogador) {
                    throw new AppError("Nenhum jogador encontrado",401)
                }
                await this.jogadorModule.deleteOne({_id:jogador.id})
                return
        } catch (error) {
           throw new AppError("Erro ao remover usuario",500)
        }
    }

    
}
