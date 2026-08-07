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
            description: string;
            email: string | null;
            status: import(".prisma/client").$Enums.StatusRequest;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            name: string;
            logo: string | null;
            banner: string | null;
            phone: string | null;
            website: string | null;
            industry: string | null;
            address: string | null;
            rejectionReason: string | null;
        };
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            id: number;
            fullname: string;
        };
    } & {
        description: string;
        email: string | null;
        status: import(".prisma/client").$Enums.StatusRequest;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        name: string;
        logo: string | null;
        banner: string | null;
        phone: string | null;
        website: string | null;
        industry: string | null;
        address: string | null;
        rejectionReason: string | null;
    })[]>;
    findAllAdmin(): Promise<({
        user: {
            email: string;
            id: number;
            fullname: string;
        };
    } & {
        description: string;
        email: string | null;
        status: import(".prisma/client").$Enums.StatusRequest;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        name: string;
        logo: string | null;
        banner: string | null;
        phone: string | null;
        website: string | null;
        industry: string | null;
        address: string | null;
        rejectionReason: string | null;
    })[]>;
    myCompany(req: any): Promise<{
        user: {
            email: string;
            id: number;
            fullname: string;
        };
    } & {
        description: string;
        email: string | null;
        status: import(".prisma/client").$Enums.StatusRequest;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        name: string;
        logo: string | null;
        banner: string | null;
        phone: string | null;
        website: string | null;
        industry: string | null;
        address: string | null;
        rejectionReason: string | null;
    }>;
    findPending(): Promise<({
        user: {
            email: string;
            id: number;
            fullname: string;
        };
    } & {
        description: string;
        email: string | null;
        status: import(".prisma/client").$Enums.StatusRequest;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        name: string;
        logo: string | null;
        banner: string | null;
        phone: string | null;
        website: string | null;
        industry: string | null;
        address: string | null;
        rejectionReason: string | null;
    })[]>;
    findOne(id: number): Promise<{
        user: {
            email: string;
            id: number;
            fullname: string;
        };
    } & {
        description: string;
        email: string | null;
        status: import(".prisma/client").$Enums.StatusRequest;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        name: string;
        logo: string | null;
        banner: string | null;
        phone: string | null;
        website: string | null;
        industry: string | null;
        address: string | null;
        rejectionReason: string | null;
    }>;
    update(id: number, req: any, dto: UpdateCompanyDto): Promise<{
        message: string;
        data: {
            description: string;
            email: string | null;
            status: import(".prisma/client").$Enums.StatusRequest;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            name: string;
            logo: string | null;
            banner: string | null;
            phone: string | null;
            website: string | null;
            industry: string | null;
            address: string | null;
            rejectionReason: string | null;
        };
    }>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
    approve(id: number): Promise<{
        message: string;
        data: {
            description: string;
            email: string | null;
            status: import(".prisma/client").$Enums.StatusRequest;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            name: string;
            logo: string | null;
            banner: string | null;
            phone: string | null;
            website: string | null;
            industry: string | null;
            address: string | null;
            rejectionReason: string | null;
        };
    }>;
    reject(id: number, dto: RejectCompanyDto): Promise<{
        message: string;
        data: {
            description: string;
            email: string | null;
            status: import(".prisma/client").$Enums.StatusRequest;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            name: string;
            logo: string | null;
            banner: string | null;
            phone: string | null;
            website: string | null;
            industry: string | null;
            address: string | null;
            rejectionReason: string | null;
        };
    }>;
}
