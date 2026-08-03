import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateJobDto): Promise<{
        message: string;
        data: {
            company: {
                id: number;
                banner: string | null;
                name: string;
                logo: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            status: import(".prisma/client").$Enums.StatusJob;
            location: string;
            salary: number | null;
            companyId: number;
        };
    }>;
    findAll(): Promise<({
        company: {
            id: number;
            banner: string | null;
            name: string;
            logo: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: import(".prisma/client").$Enums.StatusJob;
        location: string;
        salary: number | null;
        companyId: number;
    })[]>;
    findOne(id: number): Promise<{
        company: {
            id: number;
            email: string | null;
            banner: string | null;
            name: string;
            description: string;
            phone: string | null;
            website: string | null;
            industry: string | null;
            address: string | null;
            logo: string | null;
            status: import(".prisma/client").$Enums.StatusRequest;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: import(".prisma/client").$Enums.StatusJob;
        location: string;
        salary: number | null;
        companyId: number;
    }>;
    findMyJobs(userId: number): Promise<({
        company: {
            id: number;
            name: string;
            logo: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        status: import(".prisma/client").$Enums.StatusJob;
        location: string;
        salary: number | null;
        companyId: number;
    })[]>;
    update(id: number, userId: number, dto: UpdateJobDto): Promise<{
        message: string;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            status: import(".prisma/client").$Enums.StatusJob;
            location: string;
            salary: number | null;
            companyId: number;
        };
    }>;
    remove(id: number, userId: number): Promise<{
        message: string;
    }>;
    close(id: number, userId: number): Promise<{
        message: string;
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            status: import(".prisma/client").$Enums.StatusJob;
            location: string;
            salary: number | null;
            companyId: number;
        };
    }>;
}
