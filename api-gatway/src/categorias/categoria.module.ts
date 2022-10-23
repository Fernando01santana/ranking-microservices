import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/clientProxy/clientProxy.module';
import { CategoriaController } from './controller/categorias.controller';
import { CategoriasService } from './services/categorias.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoriaController],
  providers: [CategoriasService],
  exports:[CategoriaModule]
})
export class CategoriaModule {}
