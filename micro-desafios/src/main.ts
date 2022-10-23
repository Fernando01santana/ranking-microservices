import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options:{
      urls:['amqp://user:B77yv4jYwwrh@34.229.138.30:5672/smartraking'],
      noAck:false,
      queue: 'micro-challenge'
    },
  });



  await app.listen();
  logger.log('Microservice listen')
}
bootstrap();
