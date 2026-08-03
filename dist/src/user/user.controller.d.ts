import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    updateMyProfile(req: any, body: {
        fullname?: string;
    }, files: {
        profilePhoto?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<{
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
    update(id: number, dto: any): Promise<{
        id: number;
        email: string;
        fullname: string;
        profilePhoto: string | null;
        banner: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
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
