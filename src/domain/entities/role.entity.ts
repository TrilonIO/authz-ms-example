import { Scope } from './scope.entity';
import { v4 as uuid } from 'uuid';
export class Role {
  id!: string;
  name: string;
  scopes!: Scope[];
  constructor(name: string, scopes: Scope[]) {
    this.id = uuid();
    this.name = name;
    this.scopes = scopes;
  }
}
