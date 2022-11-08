import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientProxyApplication } from "src/clientProxy/clientProxy";
import { AtribuirDesafioPartidaDto } from "../dto/atribuir-jogador-partida.dto";


@Injectable()
export class PartidaService{
    constructor(
        private clientRpc:ClientProxyApplication

    ){}

    private clientRpcAdmin = this.clientRpc.getClientProxyChallenge()

    async createPartida(_id:string,createPartidaDto:AtribuirDesafioPartidaDto):Promise<any>{
        const data = {_id:_id,createPartidaDto:createPartidaDto}
        return this.clientRpcAdmin.emit('create-partida',data)
    }
}