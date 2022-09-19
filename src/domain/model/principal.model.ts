import { Injectable } from '@nestjs/common';
import { Principal } from '../entities/principal.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class PrincipalModel {
  principalsDb: Record<string, Principal>;
  constructor() {}

  create(roles: Role[]) {}
  findById(id: string) {}
  assignRoles(id: string, roles: Role[]) {}
}
