import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { RejectCompanyDto } from './dto/reject-company.dto';
import { CloudinaryService } from "../cloudinary/cloudinary.service";
export declare class CompanyService {
    private readonly prisma;
    private readonly cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    create(userId: number, dto: CreateCompanyDto, logo?: Express.Multer.File, banner?: Express.Multer.File): Promise<{
        message: string;
        data: {
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
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            email: string;
            fullname: string;
        };
    } & {
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
    })[]>;
    findAllAdmin(): Promise<({
        user: {
            id: number;
            email: string;
            fullname: string;
        };
    } & {
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
    })[]>;
    findPending(): Promise<({
        user: {
            id: number;
            email: string;
            fullname: string;
        };
    } & {
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
    })[]>;
    approve(id: number): Promise<{
        message: string;
        data: {
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
    }>;
    reject(id: number, dto: RejectCompanyDto): Promise<{
        message: string;
        data: {
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
    }>;
    findOne(id: number): Promise<{
        user: {
            id: number;
            email: string;
            fullname: string;
        };
    } & {
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
    }>;
    myCompany(userId: number): Promise<{
        user: {
            id: number;
            email: string;
            fullname: string;
        };
    } & {
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
    }>;
    update(id: number, userId: number, dto: UpdateCompanyDto): Promise<{
        message: string;
        data: {
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
    }>;
    remove(id: number, userId: number): Promise<{
        message: string;
    }>;
}
