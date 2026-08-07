import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from "../cloudinary/cloudinary.service";
export declare class ApplicationService {
    private readonly prisma;
    private readonly cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    applyJob(userId: number, jobId: number, file: Express.Multer.File): Promise<{
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
    findRecruiterApplications(userId: number): Promise<({
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
    findOneForRecruiter(id: number, userId: number): Promise<{
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
    accept(id: number, userId: number): Promise<{
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    }>;
    reject(id: number, userId: number): Promise<{
        cvUrl: string;
        status: import(".prisma/client").$Enums.StatusApplication;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        jobId: number;
    }>;
    findMyApplications(userId: number): Promise<({
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
    findMyApplication(id: number, userId: number): Promise<{
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
