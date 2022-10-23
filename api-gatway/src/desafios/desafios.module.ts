import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyRMQModule } from 'src/clientProxy/clientProxy.module';
import { ChallengeController } from './controller/desafios.controller';
import { ChallengeService } from './services/challenge.service';


@Module({
  imports: [
    ProxyRMQModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports:[ChallengeModule]
})
export class ChallengeModule {}
