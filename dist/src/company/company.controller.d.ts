import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { RejectCompanyDto } from './dto/reject-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(req: any, dto: CreateCompanyDto, files: {
        logo?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<{
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
    myCompany(req: any): Promise<{
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
    update(id: number, req: any, dto: UpdateCompanyDto): Promise<{
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
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
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
}
