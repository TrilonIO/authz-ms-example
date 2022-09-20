import { Controller, Post } from '@nestjs/common';
import { AppService } from '../domain/blocs/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createPrincipal(): string {
    return this.appService.getHello();
  }
  @Post()
  updatePrincipal(): string {
    return '';
  }
  @Post()
  createRole(): string {
    return this.appService.getHello();
  }
  @Post()
  registerScopes(): string {
    return this.appService.getHello();
  }
  @Post()
  authorize(): string {
    return this.appService.getHello();
  }
}
