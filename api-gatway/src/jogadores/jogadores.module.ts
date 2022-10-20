import { Module } from "@nestjs/common";
import { AwsModule } from "src/AWS/aws.module";
import { ProxyRMQModule } from "src/clientProxy/clientProxy.module";
import { JogadoresController } from "./controller/jogadores.controller";
import { JogadoresService } from "./services/jogadores.service";

@Module({
    imports: [ProxyRMQModule,AwsModule],
    controllers: [JogadoresController],
    providers: [JogadoresService],
    exports:[JogadoresModule]
  })
  export class JogadoresModule {}