import { v4 as uuid } from 'uuid';

export class Principal {
  id: string;
  roles: string[];
  constructor(roles: string[]) {
    this.id = uuid();
    this.roles = roles;
  }
}
