import { Injectable } from '@nestjs/common';
import { RoleRepo } from '../../data';
import { Role } from '../entities/role.entity';
@Injectable()
export class RoleModel {
  constructor(private readonly roleRepo: RoleRepo) {}

  async create(name: string, scopes: string[]) {
    const newRole = new Role(name, scopes);
    await this.roleRepo.write(newRole);
    return newRole;
  }
  async update(role: Role) {
    await this.roleRepo.write(role);
    return role;
  }
  async findById(ids: string[]) {
    const roles = await Promise.all(
      ids.map(async (id) => await this.roleRepo.read(id)),
    );
    return roles;
  }
}
