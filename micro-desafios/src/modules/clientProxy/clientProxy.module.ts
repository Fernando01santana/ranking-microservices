import { Module } from '@nestjs/common';
import { ClientProxyApplication } from './clientProxy'

@Module({
    providers: [ClientProxyApplication],
    exports: [ClientProxyApplication]
})
export class ProxyRMQModule {}
