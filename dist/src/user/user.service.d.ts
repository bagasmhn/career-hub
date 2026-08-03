import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UserService {
    private readonly prisma;
    private readonly cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    create(data: any): Promise<{
        id: number;
        email: string;
        fullname: string;
        password: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        fullname: string;
        password: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        fullname: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        skills: ({
            skill: {
                id: number;
                createdAt: Date;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            skillId: number;
        })[];
    } | null>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        fullname: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        skills: ({
            skill: {
                id: number;
                createdAt: Date;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            skillId: number;
        })[];
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        fullname: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        skills: ({
            skill: {
                id: number;
                createdAt: Date;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            skillId: number;
        })[];
    }[]>;
    findAllAdmin(): Promise<{
        id: number;
        email: string;
        fullname: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    update(id: number, data: any): Promise<{
        id: number;
        email: string;
        fullname: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMyProfile(userId: number, fullname?: string, profilePhoto?: Express.Multer.File, banner?: Express.Multer.File): Promise<{
        message: string;
        data: {
            id: number;
            email: string;
            fullname: string;
            profilePhoto: string | null;
            banner: string | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            skills: ({
                skill: {
                    id: number;
                    createdAt: Date;
                    name: string;
                };
            } & {
                id: number;
                createdAt: Date;
                userId: number;
                skillId: number;
            })[];
        };
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        fullname: string;
        password: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
