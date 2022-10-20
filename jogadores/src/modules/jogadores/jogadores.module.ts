import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresController } from './controllers/jogadores.controller';
import { JogadorShcema } from './interface/jogador.schema';
import { JogadoresService } from './services/jogadores.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'jogador',schema:JogadorShcema}])],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports: [JogadoresService]
})
export class JogadoresModule {}
