import { Injectable } from '@nestjs/common';
import { Principal } from '../domain/entities/';

@Injectable()
export class PrincipalRepo {
  principalsDb: Record<string, Principal>;
  constructor() {
    this.principalsDb = {};
  }

  async write(data: Principal) {
    this.principalsDb[data.id] = data;
    return true;
  }
  async writeMany(data: Principal[]) {
    for (const principal of data) {
      this.principalsDb[principal.id] = principal;
    }
    return true;
  }
  async read(id: string) {
    return this.principalsDb[id];
  }
  async readAll() {
    return Object.values(this.principalsDb);
  }
}
