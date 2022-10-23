import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AwsService } from "src/AWS/services/aws.service";
import { ClientProxyApplication } from "src/clientProxy/clientProxy";
import { AtualizarJogadores } from "../dtos/atualizar-jogadores-dto";
import { CriarJogadorDto } from "../dtos/criar-jogadores-dto";

@Injectable()
export class JogadoresService{
    constructor(    
        private awsService:AwsService,
        private clientRpc:ClientProxyApplication
    ){}

    private clientRpcAdmin = this.clientRpc.getClientProxyAdmin()


    create(criarJogador:CriarJogadorDto){
        return this.clientRpcAdmin.emit('criar-jogador',criarJogador)
    }

    async list(email:string){
        return await this.clientRpcAdmin.send('consultar-jogadores', email?email:'')
    }

    async update(_id:string,data:CriarJogadorDto){
        const atualizarJogador = {_id,data}        
        return this.clientRpcAdmin.emit('atualizar-jogador',atualizarJogador)
    }

    async delete(_id:string){
        return this.clientRpcAdmin.emit('remover-jogador',_id)
    }

    async uploadFile(image:any,_id:string){
        try {
        const jogador =await this.clientRpcAdmin.send('consultar-jogadores', _id?_id:'')
        if (!jogador) {
            throw new BadRequestException('Jogador nao encontrado')
        }
        const imageurl = await this.awsService.uploadFile(image,_id)

        const data:AtualizarJogadores = {}

        data.urlFotoJogador = imageurl.url
        this.clientRpcAdmin.emit('atualizar-jogador',{_id:_id,data})

        return  this.clientRpcAdmin.send('consultar-jogadores', _id?_id:'')
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}