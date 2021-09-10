export class CreateInvoiceDto {
    label: string;
    worked_days: number | undefined;
    type: string;
    isPaid: boolean;
    job_id: number | undefined;
    company_id: number | undefined;
    individual_id: number | undefined;
}
