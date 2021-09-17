import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoices/invoice.module';
import { JobModule } from './jobs/job.module';
import { CompanyModule } from './companies/company.module';
import { IndividualModule } from './individuals/individual.module';
import { LineModule } from './lines/line.module';
import { databaseModule } from './database/database.module';

@Module({
    imports: [
        InvoiceModule,
        JobModule,
        CompanyModule,
        IndividualModule,
        LineModule,
        databaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
