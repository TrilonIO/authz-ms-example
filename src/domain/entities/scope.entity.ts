import { v4 as uuid } from 'uuid';

export class Scope {
  id!: string;
  urn!: string;
  context!: string;
  constructor(urn: string, context: string) {
    this.id = uuid();
    this.urn = urn;
    this.context = context;
  }
}
