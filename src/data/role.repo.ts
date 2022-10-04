import { Injectable } from '@nestjs/common';
import { Role } from '../domain/entities/';

@Injectable()
export class RoleRepo {
  rolesDb: Record<string, Role>;
  constructor() {
    this.rolesDb = {};
  }

  async write(data: Role) {
    this.rolesDb[data.id] = data;
    return true;
  }
  async writeMany(data: Role[]) {
    for (const role of data) {
      this.rolesDb[role.id] = role;
    }
    return true;
  }
  async read(id: string) {
    return this.rolesDb[id];
  }
  async readAll() {
    return Object.values(this.rolesDb);
  }
}
