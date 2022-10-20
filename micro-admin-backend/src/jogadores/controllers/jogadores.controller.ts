import { Controller, Get, Logger, Post, Put, Query } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { KeyDuplicateException } from '../../exceptions/categoriaException';
import { IJogador } from '../interface/jogador.interface';
import { JogadoresService } from '../services/jogadores.service';


@Controller()
export class JogadoresController {
  constructor(
    private readonly jogadoresService: JogadoresService,
    ) {}

  keyDuplicateException = new KeyDuplicateException()
  logger = new Logger(JogadoresController.name)

@EventPattern('criar-jogador')
  async createCategoria(
    @Payload() jogador: IJogador, @Ctx() context: RmqContext
  ){
    const channel = context.getChannelRef()
    const message = context.getMessage()

    const jogadorData = JSON.stringify(jogador)
    this.logger.log(jogadorData)
console.log(`Informacaoes do payload: ${jogador} informacoes com JSON: ${jogadorData}`);

    try {
      await this.jogadoresService.criar(jogador)
      await channel.ack(message)
    } catch (error) {
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }

  }

  @Get()
  @EventPattern('consultar-jogadores')
  async listJogadores(@Payload() _id:any, @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const message = context.getMessage()
    
    const jogadoresData = JSON.stringify(_id)
    this.logger.log(jogadoresData)
    try {
      await channel.ack(message)
      return await this.jogadoresService.findAll(_id)

    } catch (error) {
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }
  }

  @Put()
  @EventPattern('atualizar-jogador')
  async atualizarJogador(@Payload() data:any, @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const message = context.getMessage()

    try {      
      const jogadorUpdated =  await this.jogadoresService.update(data._id,data)
      await channel.ack(message)
      return jogadorUpdated
    } catch (error) {
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }
  }
}
