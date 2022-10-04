import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthzService, ManagementService } from '../domain/blocs/';
import {
  PRINCIPAL_CREATED,
  SCOPES_CREATED,
  ROLE_CREATED,
  REQUESTED_AUTHORIZATION,
} from './events';

@Controller()
export class EventsGatewayController {
  constructor(
    private readonly authzService: AuthzService,
    private readonly mgmtService: ManagementService,
  ) {}

  @EventPattern(PRINCIPAL_CREATED)
  async createPrincipal(msg: Record<string, any>): Promise<any> {
    return this.mgmtService.createPrincipal(msg.rolesIds);
  }
  @EventPattern(ROLE_CREATED)
  async createRole(msg: Record<string, any>): Promise<any> {
    return this.mgmtService.createRole(msg.name, msg.scopesIds);
  }
  @EventPattern(SCOPES_CREATED)
  async registerScopes(msg: { scopes: any[] }): Promise<any> {
    console.log('even', msg);
    return this.mgmtService.createScopes(msg.scopes);
  }

  @EventPattern(REQUESTED_AUTHORIZATION)
  async authorize(msg): Promise<any> {
    const { id, urns } = msg;
    const authorizationMap = await this.authzService.diffScopes(id, urns);
    return {
      ...authorizationMap,
    };
  }
}
