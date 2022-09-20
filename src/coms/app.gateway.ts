import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from '../domain/blocs/app.service';
import { PRINCIPAL_CREATED, REGISTER_SCOPES } from './events';

@Controller()
export class GatewayController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(PRINCIPAL_CREATED)
  async createAuthUser(msg): Promise<any> {
    return this.appService.getHello();
  }

  @EventPattern(REGISTER_SCOPES)
  async registerScopes(msg): Promise<any> {
    return this.appService.getHello();
  }
}
