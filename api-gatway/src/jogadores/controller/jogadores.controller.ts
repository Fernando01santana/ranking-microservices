import { Body, Controller, Get, Logger, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CriarJogadorDto } from '../dtos/criar-jogadores-dto';
import { JogadoresService } from '../services/jogadores.service';
// import { CriarCategoriaDto } from '../dtos/categoria/criar-categoria-dto';
// import { CategoriasService } from '../services/categorias.service';

@Controller('api/v1')
export class JogadoresController {
  constructor(
    private jogadoresService:JogadoresService
  ){}
  private logger = new Logger(JogadoresService.name)


  @Post('jogadores/create')
  @UsePipes(ValidationPipe)
  async createCategorie(@Body() criarJogadoresDto:CriarJogadorDto){
    return await this.jogadoresService.create(criarJogadoresDto)
  }

  @Get('jogadores/list')
  async getAllCategorias(@Query() _id:any){
    return await this.jogadoresService.list(_id)
  }

  @Put('jogadores/update')
  async updateCategoria(@Body()data, @Query() _id:any){
    return await this.jogadoresService.update(_id,data)
  }

  @Post('jogadores/image/:_id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
  @UploadedFile()file,
  @Param('_id') _id:string){
    const jogador = await this.jogadoresService.uploadFile(file,_id)    
    return jogador
  }

}
