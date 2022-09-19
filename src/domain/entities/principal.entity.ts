import { Role } from './role.entity';
import { v4 as uuid } from 'uuid';

export class Principal {
  id: string;
  roles: Role[];
  constructor(roles: Role[]) {
    this.id = uuid();
    this.roles = roles;
  }
}
