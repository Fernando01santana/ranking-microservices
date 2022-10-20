import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { JogadorSchema } from 'src/jogadores/interface/jogador.schema';
import { CategoriaController } from './controllers/categorias.controller';
import { CategoriaSchema } from './interface/categoria/categoria.schema';
import { CategoriaService } from './services/categorias.service';


config()
@Module({
  imports: [
    MongooseModule.forFeature([
      {name:'categoria', schema:CategoriaSchema},
      {name:'jogador', schema:JogadorSchema},
    ]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports:[CategoriaService]
})
export class CategoriaModule {}
