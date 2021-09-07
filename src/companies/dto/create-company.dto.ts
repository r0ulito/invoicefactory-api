import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
    @ApiProperty({
        type: String,
        description: 'Company name',
    })
    name: string;
    address: string;
    zip_code: string;
    city: string;
    country: string;
}
