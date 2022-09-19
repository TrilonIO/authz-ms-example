import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { ScopeModel } from './scope.model';

@Injectable()
export class RoleModel {
  rolesDb: Record<string, Role>;
  constructor(private readonly scopeModel: ScopeModel) {}

  create(name: string, scopes: string[]) {
    const newRole = new Role(name, scopes);
    this.rolesDb[newRole.id] = newRole;
    return newRole;
  }
  findById(ids: string[]) {
    return ids.map((id) => this.rolesDb[id]);
  }
}
