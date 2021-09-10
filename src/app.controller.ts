import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
interface statusObject {
    status: string;
    error: string;
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @HttpCode(403)
    getIndex(): statusObject {
        return this.appService.getIndex();
    }
}
