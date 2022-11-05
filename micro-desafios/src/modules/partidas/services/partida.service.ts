import { BadRequestException, Injectable, Logger } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { ClientProxyApplication } from "src/modules/clientProxy/clientProxy"
import { Desafio } from "../../desafios/interface/desafio.interface"
import { Partida } from "../interface/partida.interface"

@Injectable()
export class PartidasService {

    constructor(
        @InjectModel('partida') 
        private readonly partidaModel: Model<Partida>,
        private clientRpc:ClientProxyApplication
       ) {}

    private readonly logger = new Logger(PartidasService.name)

    private clientDesafios = 
        this.clientRpc.getClientProxyDesafiosInstance()

    private clientRankings =
        this.clientRpc.getClientProxyDesafiosInstance()

    async criarPartida(partida: Partida): Promise<Partida> {
        try {

            const partidaCriada = new this.partidaModel(partida)
            this.logger.log(`partidaCriada: ${JSON.stringify(partidaCriada)}`)

            const result = await partidaCriada.save()
            this.logger.log(`result: ${JSON.stringify(result)}`)
            const idPartida = result._id
   
            const desafio: Desafio = await this.clientDesafios
                                        .send('consultar-desafios', 
                                        { idJogador: '', _id: partida.desafio })
                                        .toPromise()

            await this.clientDesafios
                                    .emit('atualizar-desafio-partida', 
                                    { idPartida: idPartida, desafio: desafio })
                                    .toPromise()

            return await this.clientRankings.emit('processar-partida', 
            {idPartida: idPartida, partida: partida}).toPromise()


            
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }

    }

    async removePartida(_id:String):Promise<String>{
        const partida:Partida = await this.partidaModel.findById(_id).exec()
        if (!partida) {
            throw new BadRequestException(`Partida ${_id} não cadastrado!`)
        }
        try {
            await this.partidaModel.remove(partida)
            return 'partida removida com sucesso'
        } catch (error) {
            throw new BadRequestException('Erro ao remover partida: '+error)
        }



    }
}
