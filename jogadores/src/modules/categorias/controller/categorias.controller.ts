import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriarCategoriaDto } from "../dtos/criar-categoria.dto";
import { ICategoria } from "../interface/categoria.interface";
import { CategorieValidateParameterPipe } from "../../../shared/common/pipes/categorie-validator";
import { CategoriaService } from "../service/categoria.service";

@Controller('/api/v1/categoria')
export class CategoriasController{
    constructor(private categoriaService:CategoriaService){}

    @Post('create')
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto:CriarCategoriaDto):Promise<ICategoria>{        
        return this.categoriaService.createcategorie(criarCategoriaDto)
    }

    @Put('update')
    // @UsePipes(ValidationPipe)
    async updateCategories(@Query('id') id:string,@Body() criarCategoriaDto:CriarCategoriaDto):Promise<ICategoria>{
        return this.categoriaService.updateCategorie(id,criarCategoriaDto)
    }

    @Get('list')
    @UsePipes(ValidationPipe)
    async findAllCategories():Promise<ICategoria[]>{
        return this.categoriaService.listAllCategories()
    }

    @Get('find/one')
    @UsePipes(ValidationPipe)
    async listForId(@Query() id:string):Promise<ICategoria>{
        return this.categoriaService.findAllById(id)
    }

    @Delete('/remove/:id')
    @UsePipes(ValidationPipe)
    async removeCategorie(@Param() id:string):Promise<void>{
        return this.categoriaService.deleteCategorie(id)
    }

    @Put('/vinculate')
    async  vinculeCategorieJogador(
            @Query('id_jogador') id_jogador:string,
            @Query('id_categorie') id_categorie:string
        ):Promise<ICategoria>{
        return this.categoriaService.vinculateCategorieAtJogador(id_jogador,id_categorie)
    }
}

