import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './AWS/aws.module';
import { CategoriaModule } from './categorias/categoria.module';
import { ChallengeModule } from './desafios/desafios.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    CategoriaModule,
    JogadoresModule,
    ChallengeModule,
    AwsModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
