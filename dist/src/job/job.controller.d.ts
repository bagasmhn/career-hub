import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    findAll(): Promise<({
        company: {
            id: number;
            name: string;
            logo: string | null;
            banner: string | null;
        };
    } & {
        description: string;
        title: string;
        status: import(".prisma/client").$Enums.StatusJob;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        location: string;
        salary: number | null;
    })[]>;
    create(req: any, dto: CreateJobDto): Promise<{
        message: string;
        data: {
            company: {
                id: number;
                name: string;
                logo: string | null;
                banner: string | null;
            };
        } & {
            description: string;
            title: string;
            status: import(".prisma/client").$Enums.StatusJob;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            companyId: number;
            location: string;
            salary: number | null;
        };
    }>;
    findMyJobs(req: any): Promise<({
        company: {
            id: number;
            name: string;
            logo: string | null;
        };
    } & {
        description: string;
        title: string;
        status: import(".prisma/client").$Enums.StatusJob;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        location: string;
        salary: number | null;
    })[]>;
    findOne(id: number): Promise<{
        company: {
            description: string;
            email: string | null;
            status: import(".prisma/client").$Enums.StatusRequest;
            id: number;
            name: string;
            logo: string | null;
            banner: string | null;
            phone: string | null;
            website: string | null;
            industry: string | null;
            address: string | null;
        };
    } & {
        description: string;
        title: string;
        status: import(".prisma/client").$Enums.StatusJob;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        companyId: number;
        location: string;
        salary: number | null;
    }>;
    update(id: number, req: any, dto: UpdateJobDto): Promise<{
        message: string;
        data: {
            description: string;
            title: string;
            status: import(".prisma/client").$Enums.StatusJob;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            companyId: number;
            location: string;
            salary: number | null;
        };
    }>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
    close(id: number, req: any): Promise<{
        message: string;
        data: {
            description: string;
            title: string;
            status: import(".prisma/client").$Enums.StatusJob;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            companyId: number;
            location: string;
            salary: number | null;
        };
    }>;
}
