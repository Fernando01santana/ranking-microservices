import { Module } from '@nestjs/common';
import { ChallengeModule } from './desafios/challenge.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv'

config()

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://docker:mongopw@localhost:55000',
    ),
    ChallengeModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
})
export class AppModule {}
