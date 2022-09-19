import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { Scope } from '../entities/scope.entity';

@Injectable()
export class RoleModel {
  rolesDb: Record<string, Role>;
  constructor() {}

  create(scopes: Scope[]) {}
  findById(id: string) {}
  update(id: string, roles: Role[]) {}
}
