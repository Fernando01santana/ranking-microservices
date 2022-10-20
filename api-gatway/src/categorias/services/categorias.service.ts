import { Inject, Injectable } from "@nestjs/common";
import { ClientProxyApplication } from "src/clientProxy/clientProxy";
import { CriarCategoriaDto } from "../dtos/categoria/criar-categoria-dto";

@Injectable()
export class CategoriasService{
    constructor(    
        private clientRpc:ClientProxyApplication
    ){}

    private clientRpcAdmin = this.clientRpc.getClientProxyAdmin()


    create(createCategorias:CriarCategoriaDto){
        return this.clientRpcAdmin.emit('criar-categoria',createCategorias)
    }

    async list(_id:string){
        return await this.clientRpcAdmin.send('consultar-categorias', _id?_id:'')
    }

    async update(_id:string,data:CriarCategoriaDto){
        const atualizarCategoria = {_id,data}        
        return this.clientRpcAdmin.emit('atualizar-categoria',atualizarCategoria)
    }

    async delete(_id:string){
        return this.clientRpcAdmin.emit('remover-categoria',_id)
    }
}