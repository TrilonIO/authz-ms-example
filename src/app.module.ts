import { Module } from '@nestjs/common';
import { AppController } from './coms/app.controller';
import { GatewayController } from './coms/app.gateway';
import { AppService } from './domain/blocs/app.service';

@Module({
  imports: [],
  controllers: [AppController, GatewayController],
  providers: [AppService],
})
export class AppModule {}
