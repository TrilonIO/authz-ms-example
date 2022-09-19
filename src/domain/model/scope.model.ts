import { Injectable } from '@nestjs/common';
import { Scope } from '../entities/scope.entity';

@Injectable()
export class ScopeModel {
  scopesDb: Record<string, Scope>;
  constructor() {}

  create(scopes: { urn: string; context: string }[]) {
    return scopes.map((scope) => {
      const newScope = new Scope(scope.urn, scope.context);
      this.scopesDb[newScope.id] = newScope;
      return newScope;
    });
  }
  findById(ids: string[]) {
    return ids.map((id) => this.scopesDb[id]);
  }
}
