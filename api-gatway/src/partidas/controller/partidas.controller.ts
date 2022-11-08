import { Body, Controller, Logger, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AtribuirDesafioPartidaDto } from "../dto/atribuir-jogador-partida.dto";
import { PartidaService } from "../services/partida.service";


@Controller('api/v1')
export class PartidaController {
    constructor(
        private partidaService:PartidaService
    ){}
    private logger = new Logger(PartidaController.name)

    @Post('challenge/create/:_id')
    @UsePipes(ValidationPipe)
    async list(@Param() _id,@Body() criarPartidaDto:AtribuirDesafioPartidaDto):Promise<any>{
        return await this.partidaService.createPartida(_id,criarPartidaDto)
    }
}