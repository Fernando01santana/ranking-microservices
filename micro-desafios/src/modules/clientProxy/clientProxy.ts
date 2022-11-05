import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

export class ClientProxyApplication{
    private clientAdminBackend: ClientProxy

 getClientProxyAdmin(): ClientProxy{
    return  this.clientAdminBackend = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options:{
          urls:[process.env.URI],
          queue:'admin-back-end'
        },
        
      })
}

getClientProxyRankings(): ClientProxy{
  return  this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls:[process.env.URI],
        queue:'rankings'
      },
      
    })
}

getClientProxyDesafiosInstance(): ClientProxy{
  return this.clientAdminBackend = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options:{
    urls:[process.env.URI],
    queue:'desafios'
  }
  })
}
}