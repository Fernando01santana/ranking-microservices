import { Module } from '@nestjs/common';
import { ChallengeModule } from './modules/desafios/challenge.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv'
import { PartidaModule } from './modules/partidas/partida.module';

config()

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.URI_MONGO,
    ),
    ChallengeModule,
    PartidaModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
})
export class AppModule {}
