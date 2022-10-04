import { v4 as uuid } from 'uuid';

export class Scope {
  id!: string;
  urn!: string;
  namespace!: string;
  constructor(urn: string, namespace: string) {
    this.id = uuid();
    this.urn = urn;
    this.namespace = namespace;
  }
}
