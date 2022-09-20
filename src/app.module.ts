import { Module } from '@nestjs/common';
import { AppController } from './coms/app.controller';
import { AppService } from './domain/blocs/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
