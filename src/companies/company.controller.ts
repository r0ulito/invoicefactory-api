import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    @ApiCreatedResponse({ description: 'company creation' })
    // @ApiBody({ type: CreateCompanyDto })
    create(@Body() createCompanyDto: CreateCompanyDto): any {
        return this.companyService.create(createCompanyDto);
    }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(+id);
    }

    @Get(':id/invoices')
    getInvoices(@Param('id') id: string) {
        return this.companyService.invoices(+id);
        return `this method should return all invoices for company #${id}`;
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ) {
        return this.companyService.update(+id, updateCompanyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.remove(+id);
    }
}
