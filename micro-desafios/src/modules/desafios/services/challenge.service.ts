import { Injectable, NotFoundException, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Desafio } from '../interface/desafio.interface';
import { Model } from 'mongoose';
import { CriarDesafioDto } from '../dtos/criar-desafio.dto';
import {IJogador} from '../interface/jogador.interface'
import { DesafioStatus } from '../interface/desafio.status';
import { ClientProxyApplication } from 'src/modules/clientProxy/clientProxy';
import { AtribuirDesafioPartidaDto } from '../dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from '../dtos/atualizar-desafio.dto';



@Injectable()
export class ChallengeService {
    constructor(
        @InjectModel('desafio') 
        private readonly challengeModel: Model<Desafio>,
        private clientRpc:ClientProxyApplication

    ){}

    private clientRpcAdmin = this.clientRpc.getClientProxyAdmin()
    private logger = new Logger(ChallengeService.name)

    async criarDesafio(createChallengeDto: CriarDesafioDto): Promise<Desafio> {
        const gaming = await this.clientRpcAdmin.send('consultar-jogadores','').toPromise()
        
        const idsGaming = gaming.map(gamingId => gamingId._id)

        for (let index = 0; index < idsGaming.length; index++) {
            const element = idsGaming[index];
            const gamingIdsFilter = createChallengeDto.jogadores.filter(gaming => gaming._id === element._id)

            if (gamingIdsFilter.length == 0) {
                throw new BadRequestException(`O id ${element._id} não é um jogador!`)
            }

            if (element[0].categoria != createChallengeDto.categoria) {
                throw new BadRequestException(`O jogador ${createChallengeDto[0]._id} não faz parte da categoria informada!`)
            }
        }

        const gamingRequest = createChallengeDto.jogadores.filter(gamingFilter => gamingFilter._id === createChallengeDto.solicitante)
        if (gamingRequest.length == 0) {
            throw new BadRequestException(`O solicitante  ${createChallengeDto[0].solicitante._id} não faz parte da partida informada!`)
        }

        const allCategories = await this.clientRpcAdmin.send('consultar-categorias',createChallengeDto.categoria).toPromise()
        if (!allCategories) {
            throw new BadRequestException(`Categoria informada não existe!`)
        }

        try {
            const desafioCriado = new this.challengeModel(createChallengeDto)
            desafioCriado.categoria = createChallengeDto.categoria
            desafioCriado.dataHoraSolicitacao = new Date()
            desafioCriado.status = DesafioStatus.PENDENTE
        const challenge = await desafioCriado.save()
        console.log(challenge);

            return challenge
        } catch (error) {
            console.log(error);
            this.logger.error(error.message)
            
        }


    }

    async consultarTodosDesafios(): Promise<Array<Desafio>> {
        try {
            return  await this.challengeModel.find()
            .populate('jogadores')
            .populate('solicitante')
            .populate([{ path: 'partida', strictPopulate: false }])
            .exec()
        } catch (error) {
            console.log(error);
        }

    }

    async consultarDesafiosDeUmJogador(_id: any): Promise<Array<Desafio>> {

        const jogadores = await this.clientRpcAdmin.send('consultar-jogadores','').toPromise()

        const jogadorFilter = jogadores.filter( jogador => jogador._id == _id )

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${_id} não é um jogador!`)
        }

        return  this.challengeModel.find()
        .where('jogadores')
        .in(_id)
        .populate("solicitante")
        .populate("jogadores")
        .populate("partida")
        .exec()

    }

    async atualizarDesafio(_id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
   
        const desafioEncontrado = await this.challengeModel.findById(_id).exec()

        if (!desafioEncontrado) {
            throw new NotFoundException(`Desafio ${_id} não cadastrado!`)
        }

        if (atualizarDesafioDto.status){
           desafioEncontrado.dataHoraResposta = new Date()         
        }
        desafioEncontrado.status = atualizarDesafioDto.status
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio

        await this.challengeModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec()
        
    }

    async atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto ): Promise<void> {
        //procura o desafio
        const desafioEncontrado = await this.challengeModel.findById(_id).exec()
        
        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }
        //procura o jogador e verifica se ele esta naquele desafio informado
       const jogadorFilter = desafioEncontrado.jogadores.filter( jogador => jogador._id == atribuirDesafioPartidaDto.def )

       if (jogadorFilter.length == 0) {
           throw new BadRequestException(`O jogador vencedor não faz parte do desafio!`)
       }

       //cria a partida = atraves da fila
       const rpcConnection =  this.clientRpc.getClientProxyDesafiosInstance()
       const createPartida = await rpcConnection.emit('create-partida',atribuirDesafioPartidaDto).toPromise()

       //atribui a partida a mesma categoria do desafio encontrado, faz o mesmo para os jogadores
       createPartida.categoria = desafioEncontrado.categoria
       createPartida.jogadores = desafioEncontrado.jogadores
       //salva a partida
       const resultado = await createPartida.save()
       //muda o status do desafio para REALIZADO
       desafioEncontrado.status = DesafioStatus.REALIZADO
       //altera o id da partida no objeto desafio
       desafioEncontrado.partida = resultado._id

        try {
        await this.challengeModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 
        } catch (error) {
           await rpcConnection.emit('delete-partida',_id)
           throw new InternalServerErrorException()
        }
    }

    async deletarDesafio(_id: string): Promise<void> {

        const desafioEncontrado = await this.challengeModel.findById(_id).exec()

        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }
        
       desafioEncontrado.status = DesafioStatus.CANCELADO

       await this.challengeModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 

    }

}
