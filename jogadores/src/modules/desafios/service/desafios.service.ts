import { Injectable, NotFoundException, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Desafio, Partida } from '../interfaces/desafio.interface';
import { Model } from 'mongoose';
import { CriarDesafioDto } from '../dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from '../dtos/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from '../dtos/atribuir-desafio-partida.dto';
import { DesafioStatus } from '../interfaces/desafio-status.enum';
import { JogadoresService } from '../../jogadores/services/jogadores.service';
import { CategoriaService } from '../../categorias/service/categoria.service';


@Injectable()
export class DesafiosService {

    constructor(
        @InjectModel('Desafio') 
        private readonly desafioModel: Model<Desafio>,
        @InjectModel('partidas') 
        private readonly partidaModel: Model<Partida>,
        private readonly jogadoresService: JogadoresService,
        private readonly categoriasService: CategoriaService) {}

        private readonly logger = new Logger(DesafiosService.name)

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {

        const jogadores = await this.jogadoresService.findAll()

        criarDesafioDto.jogadores.forEach(element => {
            const jogadorFilter = jogadores.filter( jogador => jogador._id == element._id )
            if (jogadorFilter.length == 0) {
                throw new BadRequestException(`O id ${element._id} não é um jogador!`)
            }
        });
        const solicitanteEhJogadorDaPartida = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante)
        if(solicitanteEhJogadorDaPartida.length == 0) {
            throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
        }
        const categoriaDoJogador = await this.categoriasService.consultarCategoriaDoJogador(criarDesafioDto.solicitante)

        if (!categoriaDoJogador) {
            throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`)
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto)
        desafioCriado.categoria = categoriaDoJogador.categoria
        desafioCriado.dataHoraSolicitacao = new Date()
        desafioCriado.status = DesafioStatus.PENDENTE

        return  desafioCriado.save()

    }

    async consultarTodosDesafios(): Promise<Array<Desafio>> {
        try {
            return  await this.desafioModel.find()
            .populate('jogadores')
            .populate('solicitante')
            .populate([{ path: 'partida', strictPopulate: false }])
            .exec()
        } catch (error) {
            console.log(error);
        }

    }

    async consultarDesafiosDeUmJogador(_id: any): Promise<Array<Desafio>> {

       const jogadores = await this.jogadoresService.findAll()

        const jogadorFilter = jogadores.filter( jogador => jogador._id == _id )

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${_id} não é um jogador!`)
        }

        return  this.desafioModel.find()
        .where('jogadores')
        .in(_id)
        .populate("solicitante")
        .populate("jogadores")
        .populate("partida")
        .exec()

    }

    async atualizarDesafio(_id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
   
        const desafioEncontrado = await this.desafioModel.findById(_id).exec()

        if (!desafioEncontrado) {
            throw new NotFoundException(`Desafio ${_id} não cadastrado!`)
        }

        if (atualizarDesafioDto.status){
           desafioEncontrado.dataHoraResposta = new Date()         
        }
        desafioEncontrado.status = atualizarDesafioDto.status
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio

        await this.desafioModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec()
        
    }

    async atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto ): Promise<void> {
        //procura o desafio
        const desafioEncontrado = await this.desafioModel.findById(_id).exec()
        
        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }
        //procura o jogador e verifica se ele esta naquele desafio informado
       const jogadorFilter = desafioEncontrado.jogadores.filter( jogador => jogador._id == atribuirDesafioPartidaDto.def )

       if (jogadorFilter.length == 0) {
           throw new BadRequestException(`O jogador vencedor não faz parte do desafio!`)
       }

       //cria a partida
       const partidaCriada = new this.partidaModel(atribuirDesafioPartidaDto)
       //atribui a partida a mesma categoria do desafio encontrado, faz o mesmo para os jogadores
       partidaCriada.categoria = desafioEncontrado.categoria
       partidaCriada.jogadores = desafioEncontrado.jogadores
       //salva a partida
       const resultado = await partidaCriada.save()
       //muda o status do desafio para REALIZADO
       desafioEncontrado.status = DesafioStatus.REALIZADO
       //altera o id da partida no objeto desafio
       desafioEncontrado.partida = resultado._id

        try {
        await this.desafioModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 
        } catch (error) {
           await this.partidaModel.deleteOne({_id: resultado._id}).exec();
           throw new InternalServerErrorException()
        }
    }

    async deletarDesafio(_id: string): Promise<void> {

        const desafioEncontrado = await this.desafioModel.findById(_id).exec()

        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }
        
        /*
        Realizaremos a deleção lógica do desafio, modificando seu status para
        CANCELADO
        */
       desafioEncontrado.status = DesafioStatus.CANCELADO

       await this.desafioModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 

    }

}
