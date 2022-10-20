import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './AWS/aws.module';
import { CategoriaModule } from './categorias/categoria.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    CategoriaModule,
    JogadoresModule,
    AwsModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
