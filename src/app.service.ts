import { Injectable } from '@nestjs/common';
interface statusObject {
    status: string;
    error: string;
}

@Injectable()
export class AppService {
    getIndex(): statusObject {
        return {
            status: '403',
            error: "You shouldn't be here !",
        };
    }
}
