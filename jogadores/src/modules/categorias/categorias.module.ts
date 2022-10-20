/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { JogadoresService } from '../jogadores/services/jogadores.service';
import { CategoriasController } from './controller/categorias.controller';
import { categoriaSchema } from './interface/categoria.schema';
import { CategoriaService } from './service/categoria.service';


@Module({
    imports: [
        JogadoresModule,
        MongooseModule.forFeature([{name:'categoria',schema:categoriaSchema}]),
    ],
    controllers: [CategoriasController],
    providers: [CategoriaService],
    exports:[CategoriaService]
})
export class CategoriasModule {}
