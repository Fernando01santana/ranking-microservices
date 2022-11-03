import { Module } from '@nestjs/common';
import { ChallengeModule } from './desafios/challenge.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv'

config()

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.URI_MONGO,
    ),
    ChallengeModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
})
export class AppModule {}
