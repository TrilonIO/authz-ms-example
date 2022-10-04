import { Injectable } from '@nestjs/common';
import { Scope } from '../domain/entities/';

@Injectable()
export class ScopeRepo {
  scopesDb: Record<string, Scope>;
  constructor() {
    this.scopesDb = {};
  }

  async write(data: Scope) {
    this.scopesDb[data.id] = data;
    return true;
  }
  async writeMany(data: Scope[]) {
    for (const scope of data) {
      this.scopesDb[scope.id] = scope;
    }
    return true;
  }
  async read(id: string) {
    return this.scopesDb[id];
  }
  async readAll() {
    return Object.values(this.scopesDb);
  }
}
