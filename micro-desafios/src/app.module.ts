import { Module } from '@nestjs/common';
import { ChallengeModule } from './desafios/challenge.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv'

config()
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.bysac1u.mongodb.net/?retryWrites=true&w=majority`,
    ),
    ChallengeModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
})
export class AppModule {}
