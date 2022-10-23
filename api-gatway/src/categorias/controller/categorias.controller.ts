import { Body, Controller, Get, Logger, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from '../dtos/categoria/criar-categoria-dto';
import { CategoriasService } from '../services/categorias.service';

@Controller('api/v1')
export class CategoriaController {
  constructor(
    private categoriasService:CategoriasService
  ){}
  private logger = new Logger(CategoriaController.name)


  @Post('categoria/create')
  @UsePipes(ValidationPipe)
  async createCategorie(@Body() criarCategoriaDto:CriarCategoriaDto){
    return await this.categoriasService.create(criarCategoriaDto)
  }

  @Get('categoria/list')
  async getAllCategorias(@Query() _id:any){
    return await this.categoriasService.list(_id)
  }

  @Put('categoria/update')
  async updateCategoria(@Body()data, @Query() _id:any){
    return await this.categoriasService.update(_id,data)
  }


}
