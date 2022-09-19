import { v4 as uuid } from 'uuid';
export class Role {
  id!: string;
  name: string;
  scopes!: string[];
  constructor(name: string, scopes: string[]) {
    this.id = uuid();
    this.name = name;
    this.scopes = scopes;
  }
}
