import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { EventsGatewayController, RestController } from './coms/';
import { AuthzService, ManagementService } from './domain/blocs/';
import { PrincipalModel, RoleModel, ScopeModel } from './domain/model';
import BrokerConfig from './config/broker.config';
import { PrincipalRepo, RoleRepo, ScopeRepo } from './data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [BrokerConfig],
    }),
  ],
  controllers: [RestController, EventsGatewayController],
  providers: [
    {
      provide: 'BROKER_CLIENT',
      inject: [BrokerConfig.KEY],
      useFactory: (brokerConfig: ConfigType<typeof BrokerConfig>) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [brokerConfig.brokerUri],
            queue: brokerConfig.queue,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
    AuthzService,
    ManagementService,
    PrincipalModel,
    RoleModel,
    ScopeModel,
    PrincipalRepo,
    RoleRepo,
    ScopeRepo,
  ],
})
export class AppModule {}
