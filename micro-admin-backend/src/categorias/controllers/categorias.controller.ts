import { Controller, Get, Logger, Post, Put, Query } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CategoriaService } from '../services/categorias.service';
import { KeyDuplicateException } from '../../exceptions/categoriaException';
import { ICategoria } from '../interface/categoria/categoria.interface';

@Controller()
export class CategoriaController {
  constructor(
    private readonly appService: CategoriaService,
    ) {}

  keyDuplicateException = new KeyDuplicateException()
  logger = new Logger(CategoriaController.name)

@EventPattern('criar-categoria')
  async createCategoria(
    @Payload() categoria: ICategoria, @Ctx() context: RmqContext
  ){
    const channel = context.getChannelRef()
    const message = context.getMessage()

    const categoriaData = JSON.stringify(categoria)
    this.logger.log(categoriaData)

    try {
      await this.appService.createcategorie(categoria)
      await channel.ack(message)
    } catch (error) {
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }

  }

  @Get()
  @EventPattern('consultar-categorias')
  async listCategorias(@Payload() _id:string, @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const message = context.getMessage()
    
    const categoriaData = JSON.stringify(_id)
    this.logger.log(categoriaData)
    try {
      await channel.ack(message)
      return await this.appService.findAllById(_id)

    } catch (error) {
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }
  }

  @Put()
  @EventPattern('atualizar-categoria')
  async atualizarCategoria(@Payload() data:any, @Ctx() context: RmqContext){
    const channel = context.getChannelRef()
    const message = context.getMessage()

    try {      
    const categoriaData = JSON.stringify(data)
      const categoriaUpdate =  await this.appService.update(categoriaData)
      await channel.ack(message)
      return categoriaUpdate
    } catch (error) {
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }
  }
}
