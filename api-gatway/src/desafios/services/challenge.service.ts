import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientProxyApplication } from "src/clientProxy/clientProxy";
import { CreateChallengeDto } from "../dto/create.challenge.dto";

@Injectable()
export class ChallengeService{
    constructor(
        private clientRpc:ClientProxyApplication

    ){}

    private clientRpcAdmin = this.clientRpc.getClientProxyChallenge()

    async createChallenge(createChallengeDto:CreateChallengeDto):Promise<any>{
        return this.clientRpcAdmin.emit('create-challenge',createChallengeDto)
    }
}