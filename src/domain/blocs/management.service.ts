import { Injectable } from '@nestjs/common';
import { RoleModel, ScopeModel } from '../model';
import { PrincipalModel } from '../model/principal.model';

@Injectable()
export class ManagementService {
  constructor(
    private readonly principalModel: PrincipalModel,
    private readonly scopeModel: ScopeModel,
    private readonly roleModel: RoleModel,
  ) {}
  async createPrincipal(rolesIds: string[]) {
    return this.principalModel.create(rolesIds);
  }
  async createRole(name: string, scopesIds: string[]) {
    return this.roleModel.create(name, scopesIds);
  }
  async createScopes(scopes: { urn: string; namespace: string }[]) {
    return this.scopeModel.create(scopes);
  }
}
