import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CategoriaSchema } from 'src/categorias/interface/categoria/categoria.schema';
import { JogadorSchema } from 'src/jogadores/interface/jogador.schema';
import { JogadoresController } from './controllers/jogadores.controller';
import { JogadoresService } from './services/jogadores.service';



config()
@Module({
  imports: [
    MongooseModule.forFeature([
      {name:'categoria', schema:CategoriaSchema},
      {name:'jogador', schema:JogadorSchema},
    ]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports:[JogadoresService]
})
export class JogadorModule {}
