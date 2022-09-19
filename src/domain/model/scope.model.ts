import { Injectable } from '@nestjs/common';
import { Scope } from '../entities/scope.entity';

@Injectable()
export class RoleModel {
  scopesDb: Record<string, Scope>;
  constructor() {}

  create(urn: string, context: string) {}
  findById(id: string) {}
  update(id: string, urn: string, context: string) {}
}
