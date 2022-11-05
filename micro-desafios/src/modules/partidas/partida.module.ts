import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProxyRMQModule } from "../clientProxy/clientProxy.module";
import { PartidaController } from "./controllers/partida.controller";
import { PartidaSchema } from "./interface/partida.schema";
import { PartidasService } from "./services/partida.service";

@Module({
    imports: [
      ProxyRMQModule,    
      MongooseModule.forFeature([
      {name:'partida', schema:PartidaSchema},
    ]),],
    controllers: [PartidaController],
    providers: [PartidasService],
    exports:[PartidaModule]
  })
  export class PartidaModule {}