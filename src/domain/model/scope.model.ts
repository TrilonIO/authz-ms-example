import { Injectable } from '@nestjs/common';
import { Scope } from '../entities/scope.entity';
import { ScopeRepo } from '../../data';

@Injectable()
export class ScopeModel {
  constructor(private readonly scopeRepo: ScopeRepo) {}

  async create(scopes: { urn: string; namespace: string }[]) {
    const scopesToWrite = scopes.map(
      (scope) => new Scope(scope.urn, scope.namespace),
    );
    await this.scopeRepo.writeMany(scopesToWrite);
    return scopesToWrite;
  }
  async findById(ids: string[]) {
    const scopes = await Promise.all(
      ids.map(async (id) => await this.scopeRepo.read(id)),
    );
    return scopes;
  }
}
