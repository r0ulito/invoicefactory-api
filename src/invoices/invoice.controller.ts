import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { get } from 'http';

@Controller('invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Post()
    create(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoiceService.create(createInvoiceDto);
    }

    @Get()
    findAll() {
        return this.invoiceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoiceService.findOne(+id);
    }

    @Get(':id/jobs')
    getJobs(@Param('id') id: string) {
        return this.invoiceService.jobs(+id);
    }

    @Get(':id/lines')
    getLines(@Param('id') id: string) {
        return this.invoiceService.lines(+id);
    }

    @Get(':id/client')
    getClient(@Param('id') id: string) {
        return this.invoiceService.client(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateInvoiceDto: UpdateInvoiceDto,
    ) {
        return this.invoiceService.update(+id, updateInvoiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.invoiceService.remove(+id);
    }
}
