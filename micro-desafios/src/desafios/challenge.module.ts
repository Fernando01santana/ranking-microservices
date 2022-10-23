import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProxyRMQModule } from 'src/clientProxy/clientProxy.module';
import { ChallengeController } from './controllers/desafios.controllers';
import { DesafioSchema } from './interface/desafio.schema';
import { ChallengeService } from './services/challenge.service';

@Module({
  imports: [
    ProxyRMQModule,    
    MongooseModule.forFeature([
    {name:'desafio', schema:DesafioSchema},
  ]),],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports:[ChallengeModule]
})
export class ChallengeModule {}
