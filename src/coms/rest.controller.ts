import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { ManagementService, AuthzService } from '../domain/blocs';
@Controller()
export class RestController {
  constructor(
    private readonly mgmtService: ManagementService,
    private readonly authzService: AuthzService,
  ) {}

  @Post('principal/create')
  async createPrincipal(@Body() body: { roles: string[] }): Promise<any> {
    return this.mgmtService.createPrincipal(body.roles);
  }
  @Post('role/create')
  async createRole(
    @Body() body: { name: string; scopesIds: string[] },
  ): Promise<any> {
    return this.mgmtService.createRole(body.name, body.scopesIds);
  }
  @Post('scopes/register')
  async registerScopes(
    @Body() body: { scopes: { urn: string; namespace: string }[] },
  ): Promise<any> {
    return this.mgmtService.createScopes(body.scopes);
  }
  @HttpCode(200)
  @Post('authorize')
  async authorize(@Body() body: any): Promise<any> {
    const { id, urns } = body;
    const authorizationMap = await this.authzService.diffScopes(id, urns);

    return {
      ...authorizationMap,
    };
  }
}
