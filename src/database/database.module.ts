import { Module } from '@nestjs/common';
import { databaseService } from './database.service';

@Module({
    providers: [databaseService],
})
export class databaseModule {}
