import { Injectable } from '@nestjs/common';
import { Principal } from '../entities/principal.entity';

@Injectable()
export class PrincipalModel {
  principalsDb: Record<string, Principal>;
  constructor() {}

  create(roles: string[]) {
    const newPrincipal = new Principal(roles);
    this.principalsDb[newPrincipal.id] = newPrincipal;
    return newPrincipal;
  }
  findById(id: string) {
    return this.principalsDb[id];
  }
  assignRoles(id: string, roles: string[]) {
    this.principalsDb[id].roles = roles;
    return this.principalsDb[id];
  }
}
