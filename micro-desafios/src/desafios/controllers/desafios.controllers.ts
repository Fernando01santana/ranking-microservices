import { Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { KeyDuplicateException } from 'src/shared/error/KeyDuplicateException';
import { ChallengeService } from '../services/challenge.service';

@Controller('api/v1')
@UsePipes(ValidationPipe)

export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  private logger = new Logger()
  private keyDuplicateException = new KeyDuplicateException()

  @Post()
  @UsePipes(ValidationPipe)
  @EventPattern('create-challenge')
  async createChallenge(@Payload() data:any,@Ctx() context:RmqContext ){
    const channel = context.getChannelRef()
    const message = context.getMessage()
    try {
      const challengeData = JSON.stringify(data)
      
      const createChallenge = await this.challengeService.criarDesafio(data)
      await channel.ack(message)
      return createChallenge
    } catch (error) {
      console.log(error);
      
      this.logger.error(error.message)
      this.keyDuplicateException.verify(error,channel,message)
    }

  }
}
