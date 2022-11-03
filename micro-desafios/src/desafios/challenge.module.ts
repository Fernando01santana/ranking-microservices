import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProxyRMQModule } from 'src/clientProxy/clientProxy.module';
import { ChallengeController } from './controllers/desafios.controllers';
import { DesafioSchema } from './interface/desafio.schema';
import { PartidaSchema } from './interface/partida.schema';
import { ChallengeService } from './services/challenge.service';

@Module({
  imports: [
    ProxyRMQModule,    
    MongooseModule.forFeature([
    {name:'desafio', schema:DesafioSchema},
    {name:'partida', schema:PartidaSchema},
  ]),],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports:[ChallengeModule]
})
export class ChallengeModule {}
