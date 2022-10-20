import { Injectable, Logger } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICategoria } from "../interface/categoria/categoria.interface";
import { IJogador } from "../../jogadores/interface/jogador.interface";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectModel('categoria')
        private readonly categorieModule: Model<ICategoria>,
        ){}
  
        private readonly logger = new Logger(CategoriaService.name);

    public async createcategorie(createCategory:ICategoria):Promise<ICategoria>{        
        try {
            const createCategorie = new this.categorieModule(createCategory)
            const categorieSave = await createCategorie.save()
            return categorieSave
        } catch (error) {
          this.logger.error(`error: ${JSON.stringify(error.message)}`)
          throw new RpcException(error.message)
        }
    }

    public async listAllCategories():Promise<ICategoria[]>{
      const categorias = await this.categorieModule.find()
      return categorias
    }

    async findAllById(id:any):Promise<ICategoria | ICategoria[]>{
      if (id._id ) {
        const categoria = await this.categorieModule.findById(String(id._id))
        return categoria
      }
      const categorias = await this.listAllCategories()
       return categorias
    }

    async update(data:any):Promise<ICategoria>{
      try {        
        const updateCategoria = JSON.parse(data)
        
        const searchCategorie = await this.categorieModule.findOne({_id:updateCategoria._id}).exec()
        if(!searchCategorie){
            throw new RpcException('Nenhuma categoria com o id informado encontrada');
        }
        const categorieUpdated = await this.categorieModule.findOneAndUpdate({_id:updateCategoria._id},{$set:updateCategoria.data.categoria
        }).exec()
        return categorieUpdated
      } catch (error) {
        throw new RpcException(error.message)
      }

    }
  }