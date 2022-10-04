import { Injectable } from '@nestjs/common';
import { Principal } from '../entities/principal.entity';
import { PrincipalRepo, RoleRepo, ScopeRepo } from '../../data/';

@Injectable()
export class PrincipalModel {
  constructor(
    private readonly principalRepo: PrincipalRepo,
    private readonly roleRepo: RoleRepo,
    private readonly scopeRepo: ScopeRepo,
  ) {}

  async create(roles: string[]) {
    const newPrincipal = new Principal(roles);
    this.principalRepo.write(newPrincipal);
    return newPrincipal;
  }
  async findById(id: string) {
    return this.principalRepo.read(id);
  }
  async getScopes(principalId: string) {
    const rolesIds = (await this.principalRepo.read(principalId)).roles;
    let scopesIds = [];
    for (const role of rolesIds) {
      scopesIds = scopesIds.concat((await this.roleRepo.read(role)).scopes);
    }
    // eliminate dups
    const scopes = [];
    for (const id of [...new Set(scopesIds)]) {
      scopes.push(await this.scopeRepo.read(id));
    }
    return scopes;
  }

  async assignRoles(id: string, roles: string[]) {
    const principal = await this.principalRepo.read(id);
    principal.roles = roles;
    await this.principalRepo.write(principal);
    return principal;
  }
}
