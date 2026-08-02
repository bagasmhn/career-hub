import { PrismaService } from '../prisma/prisma.service';
export declare class ApplicationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findRecruiterApplications(userId: number): Promise<({
        user: {
            id: number;
            email: string;
            fullname: string;
        };
        job: {
            id: number;
            company: {
                id: number;
                name: string;
                logo: string | null;
            };
            status: import(".prisma/client").$Enums.StatusJob;
            title: string;
            location: string;
            salary: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.StatusApplication;
        jobId: number;
        cvUrl: string;
    })[]>;
    findOneForRecruiter(id: number, userId: number): Promise<{
        user: {
            id: number;
            email: string;
            fullname: string;
        };
        job: {
            company: {
                id: number;
                email: string | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                phone: string | null;
                website: string | null;
                industry: string | null;
                address: string | null;
                userId: number;
                logo: string | null;
                banner: string | null;
                status: import(".prisma/client").$Enums.StatusRequest;
                rejectionReason: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            status: import(".prisma/client").$Enums.StatusJob;
            title: string;
            location: string;
            salary: number | null;
            companyId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.StatusApplication;
        jobId: number;
        cvUrl: string;
    }>;
    accept(id: number, userId: number): Promise<{
        message: string;
        data: {
            user: {
                id: number;
                email: string;
                fullname: string;
            };
            job: {
                id: number;
                title: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            status: import(".prisma/client").$Enums.StatusApplication;
            jobId: number;
            cvUrl: string;
        };
    }>;
    reject(id: number, userId: number): Promise<{
        message: string;
        data: {
            user: {
                id: number;
                email: string;
                fullname: string;
            };
            job: {
                id: number;
                title: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            status: import(".prisma/client").$Enums.StatusApplication;
            jobId: number;
            cvUrl: string;
        };
    }>;
    findMyApplications(userId: number): Promise<({
        job: {
            id: number;
            company: {
                id: number;
                name: string;
                logo: string | null;
            };
            description: string;
            status: import(".prisma/client").$Enums.StatusJob;
            title: string;
            location: string;
            salary: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.StatusApplication;
        jobId: number;
        cvUrl: string;
    })[]>;
    findMyApplication(id: number, userId: number): Promise<{
        job: {
            id: number;
            company: {
                id: number;
                name: string;
                logo: string | null;
            };
            description: string;
            status: import(".prisma/client").$Enums.StatusJob;
            title: string;
            location: string;
            salary: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.StatusApplication;
        jobId: number;
        cvUrl: string;
    }>;
}
