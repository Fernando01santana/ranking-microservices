import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IJogador } from "src/modules/jogadores/interface/jogador.interface";
import { JogadoresService } from "src/modules/jogadores/services/jogadores.service";
import AppError from "src/shared/error/AppError";
import { CriarCategoriaDto } from "../dtos/criar-categoria.dto";
import { ICategoria } from "../interface/categoria.interface";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectModel('categoria')
        private readonly categorieModule: Model<ICategoria>,
        private readonly jogadoresService: JogadoresService
        ){}
  
        private readonly logger = new Logger(CategoriaService.name);

    public async createcategorie(createCategory:CriarCategoriaDto):Promise<ICategoria>{        
        const categorie = await this.categorieModule.findOne({categoria:createCategory.categoria}).exec()
        if (categorie) {
            throw new AppError('Categoria ja cadastrada no sistema')
        }
        try {
            const createCategorie = new this.categorieModule(createCategory)
            const categorieSave = await createCategorie.save()
            return categorieSave
        } catch (error) {
            throw new AppError('Erro ao criar categoria: ',error)
        }
    }
    public async listAllCategories():Promise<ICategoria[]>{
        return this.categorieModule.find()
    }

    public async updateCategorie(id:string, updatedCategorie:CriarCategoriaDto):Promise<ICategoria>{
        const searchCategorie = await this.categorieModule.findOne({_id:id}).exec()
        if(!searchCategorie){
            throw new AppError('Nenhuma categoria com o id informado encontrada',401);
        }
        const categorieUpdated = await this.categorieModule.findOneAndUpdate({id:id},{$set:updatedCategorie}).exec()
        return categorieUpdated
    }

    public async deleteCategorie(id:any):Promise<void>{
        const searchCategorie = await this.categorieModule.findById(String(id.id))
        if (!searchCategorie) {
            throw new AppError('Nenhuma categoria  encontrada',401);
        }
        
        await this.categorieModule.deleteOne({id:id})
        return;

    }

    async findAllById(id:any):Promise<ICategoria>{
        return this.categorieModule.findById(String(id.id))
    }

    async searchJogadorById(id:string):Promise<IJogador>{
        const jogador = await this.jogadoresService.findById(id)
        return jogador
    }

    async vinculateCategorieAtJogador(idJogador:string, idCategorie:string):Promise<ICategoria>{        
        try {      
            const jogador = await this.searchJogadorById(idJogador)            
            const categorie = await this.categorieModule.findById({_id:idCategorie}).exec()
            const jogadorInCategorie = await this.categorieModule.find({idCategorie}).where('jogadores').in([idJogador]).exec()
            if (jogadorInCategorie.length === 0) {      
                categorie.jogadores.push(jogador)
                return  await this.categorieModule.findOneAndUpdate({_id:categorie.id},{$set:categorie}).exec()
            }
            throw new BadRequestException('Jogador ja vinculado a categoria selecionada')
        } catch (error) {
            throw new BadRequestException(`Erro ao vincular jogador a categoria: ${error.message}`)        
        }
    }

    async consultarCategoriaDoJogador(idJogador: any): Promise<ICategoria> {
       const jogadores = await this.jogadoresService.findAll()

       const jogadorFilter = jogadores.filter( jogador => jogador._id == idJogador )

       if (jogadorFilter.length == 0) {
           throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
       }

        return await this.categorieModule.findOne().where('jogadores').in(idJogador).exec() 

    }

}



