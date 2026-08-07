import { ApplicationService } from './application.service';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    applyJob(jobId: number, cv: Express.Multer.File, req: any): Promise<{
        message: string;
        data: {
            job: {
                id: number;
                title: string;
                location: string;
                company: {
                    id: number;
                    name: string;
                };
            };
        } & {
            cvUrl: string;
            status: import(".prisma/client").$Enums.StatusApplication;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            jobId: number;
        };
    }>;
    findRecruiterApplications(req: any): Promise<({
        user: {
            id: number;
            email: string;
            fullname: string;
        };
        job: {
            status: import(".prisma/client").$Enums.StatusJob;
            id: number;
            title: string;
            location: string;
            salary: number | null;
            company: {
                id: number;
                name: string;
                logo: string | null;
            };
        };
    } & {
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    })[]>;
    findOneForRecruiter(id: number, req: any): Promise<{
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            banner: string | null;
            email: string;
            fullname: string;
            password: string;
            profilePhoto: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
        job: {
            company: {
                status: import(".prisma/client").$Enums.StatusRequest;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number;
                description: string;
                name: string;
                logo: string | null;
                banner: string | null;
                email: string | null;
                phone: string | null;
                website: string | null;
                industry: string | null;
                address: string | null;
                rejectionReason: string | null;
            };
        } & {
            status: import(".prisma/client").$Enums.StatusJob;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            companyId: number;
            title: string;
            description: string;
            location: string;
            salary: number | null;
        };
    } & {
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    }>;
    accept(id: number, req: any): Promise<{
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    }>;
    reject(id: number, req: any): Promise<{
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    }>;
    findMyApplications(req: any): Promise<({
        job: {
            company: {
                status: import(".prisma/client").$Enums.StatusRequest;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number;
                description: string;
                name: string;
                logo: string | null;
                banner: string | null;
                email: string | null;
                phone: string | null;
                website: string | null;
                industry: string | null;
                address: string | null;
                rejectionReason: string | null;
            };
        } & {
            status: import(".prisma/client").$Enums.StatusJob;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            companyId: number;
            title: string;
            description: string;
            location: string;
            salary: number | null;
        };
    } & {
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    })[]>;
    findMyApplication(id: number, req: any): Promise<{
        job: {
            company: {
                status: import(".prisma/client").$Enums.StatusRequest;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                userId: number;
                description: string;
                name: string;
                logo: string | null;
                banner: string | null;
                email: string | null;
                phone: string | null;
                website: string | null;
                industry: string | null;
                address: string | null;
                rejectionReason: string | null;
            };
        } & {
            status: import(".prisma/client").$Enums.StatusJob;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            companyId: number;
            title: string;
            description: string;
            location: string;
            salary: number | null;
        };
    } & {
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    }>;
}
