import { StatusJob } from '@prisma/client';
export declare class UpdateJobDto {
    title?: string;
    description?: string;
    location?: string;
    salary?: number;
    status?: StatusJob;
}
