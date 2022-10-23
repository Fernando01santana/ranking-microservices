import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateChallengeDto } from "../dto/create.challenge.dto";
import { ChallengeService } from "../services/challenge.service";

@Controller('api/v1')
export class ChallengeController {
    constructor(
        private desafioService:ChallengeService
    ){}
    private logger = new Logger(ChallengeController.name)

    @Post('challenge/create')
    @UsePipes(ValidationPipe)
    async list(@Body() createChallengeDto:CreateChallengeDto):Promise<any>{
        return await this.desafioService.createChallenge(createChallengeDto)
    }
}