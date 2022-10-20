import { Module } from '@nestjs/common';
import { DesafiosController } from './controller/desafios.controller';
import { DesafiosService } from './service/desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { PartidaSchema } from './interfaces/partida.schema';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { JogadoresService } from '../jogadores/services/jogadores.service';
import { CategoriaService } from '../categorias/service/categoria.service';


/*
Desafio
*/

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Desafio', schema: DesafioSchema},
      {name: 'partidas', schema: PartidaSchema}]),
    JogadoresModule,
    CategoriasModule],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
