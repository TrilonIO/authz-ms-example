import { Injectable } from '@nestjs/common';
import { PrincipalModel } from '../model/principal.model';

@Injectable()
export class AuthzService {
  constructor(private readonly principalModel: PrincipalModel) {}
  async diffScopes(principalId: string, scopesUrns: string[]) {
    const principalScopes = await this.principalModel.getScopes(principalId);
    const urnsDiff: Record<string, boolean> = {};
    for (const urn of scopesUrns) {
      if (
        principalScopes.findIndex(
          (principalScope) => principalScope.urn === urn,
        ) === -1
      ) {
        urnsDiff[urn] = false;
      } else {
        urnsDiff[urn] = true;
      }
    }
    return urnsDiff;
  }
}
