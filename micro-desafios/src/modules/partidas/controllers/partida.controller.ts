import { Delete, Logger, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices"
import { KeyDuplicateException } from "src/shared/error/KeyDuplicateException"
import { PartidasService } from "../services/partida.service"

export class PartidaController {
    constructor(private readonly partidaService: PartidasService) {}
  
    private logger = new Logger()
    private keyDuplicateException = new KeyDuplicateException()
  
    @Post()
    @UsePipes(ValidationPipe)
    @EventPattern('create-partida')
    async createChallenge(@Payload() data:any,@Ctx() context:RmqContext ){
      const channel = context.getChannelRef()
      const message = context.getMessage()
      try {        
        const createPartida = await this.partidaService.criarPartida(data)
        await channel.ack(message)
        return createPartida
      } catch (error) {
        this.logger.error(error.message)
        this.keyDuplicateException.verify(error,channel,message)
      }
  
    }

    @Delete()
    @UsePipes(ValidationPipe)
    @EventPattern('delete-partida')
    async removePartida(@Payload() data:any, @Ctx() context:RmqContext){
        const channel = context.getChannelRef()
        const message = context.getMessage()

        try {
            const deletePartida = await this.partidaService.removePartida(data)
            await channel.ack(message)
            return deletePartida
        } catch (error) {
            this.logger.error(error.message)
            this.keyDuplicateException.verify(error,channel,message)
        }
    }
  }