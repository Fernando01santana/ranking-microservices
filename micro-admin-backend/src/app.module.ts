import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CategoriaSchema } from './categorias/interface/categoria/categoria.schema';
import { JogadorSchema } from './jogadores/interface/jogador.schema';
import { CategoriaModule } from './categorias/categorias.module';
import { JogadorModule } from './jogadores/jogador.module';

config()
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://docker:mongopw@localhost:55000',
    ),
    MongooseModule.forFeature([
      {name:'categoria', schema:CategoriaSchema},
      {name:'jogador', schema:JogadorSchema},
    ]),
    CategoriaModule,
    JogadorModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
