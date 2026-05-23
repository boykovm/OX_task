import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/health')
  getHealth() {
    // todo: add info about db

    return {
      status: 'ok',
      db: 'ok',
      uptime: process.uptime(),
    };
  }
}
